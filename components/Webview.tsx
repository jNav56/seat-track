import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import { useThemes } from '@/providers/Themes/ThemeProvider';
import { Seats } from '@/store/states/Searches/interfaces';
import {
  selectEntitySearches,
  selectSelectedSearch,
} from '@/store/states/Searches/selectors';
import { addSeats } from '@/store/states/Searches/slice';
import { Screen } from '@/controls/Screen';
import { View } from '@/controls/View';
import { PrimaryButton, SecondaryButton } from '@/controls/Buttons/Buttons';

interface Offer {
  items: {
    sectionLabel: string;
    rowLabel: string;
    number: string;
  }[];
}

const searchRegEx = /https:\/\/unifiedapicommerce\.us-prod0\.axs\.com\/veritix\/inventory\/V2\/.+\/offer\/search\?flow=pick_a_seat_2d/;

const injectedJS = `
    (function() {
      // Intercept fetch()
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        return originalFetch(...args).then(response => {
          response.clone().json().then(data => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ url: args[0], data }));
          }).catch(error => console.error('Fetch JSON parse error', error));
          return response;
        });
      };

      // Intercept XMLHttpRequest (XHR)
      const originalXHROpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        this.addEventListener("load", function() {
          try {
            const response = this.responseText;
            window.ReactNativeWebView.postMessage(JSON.stringify({ url, data: response }));
          } catch (error) {
            console.error("XHR parse error", error);
          }
        });
        return originalXHROpen.apply(this, arguments);
      };
    })();
  `;

export const Webview = () => {
  const dispatch = useDispatch();
  const { colors } = useThemes();
  const searches = useSelector(selectEntitySearches);
  const selectedSearchId = useSelector(selectSelectedSearch);
  const selectedUrl = searches[selectedSearchId].url;
  const webViewRef = useRef();
  const [webViewUrl, setWebViewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onMessage = (event) => {
    try {
      const { url, data } = JSON.parse(event.nativeEvent.data);

      if (`${url}`.match(searchRegEx)) {
        const parsedData = JSON.parse(data);

        if (webViewRef.current) {
          webViewRef.current.stopLoading();
        }

        if (
          parsedData &&
          parsedData.offers &&
          Array.isArray(parsedData.offers) &&
          parsedData.offers.length > 1
        ) {
          const obj: Seats = {};

          parsedData.offers.forEach((offer: Offer, index: number) => {            
            if (!!index && offer.items && offer.items.length > 1) {

              offer.items.forEach((item) => {
                if (
                  item.sectionLabel &&
                  item.rowLabel &&
                  item.number
                ) {
                  const { sectionLabel, rowLabel, number } = item;

                  // Check if section is present
                  if (obj[sectionLabel]) {
    
                    // Check if row is present in section
                    if (obj[sectionLabel][rowLabel]) {
    
                      // Check if number is present in row, if not add it
                      if (!obj[sectionLabel][rowLabel].includes(number)) {
                        obj[sectionLabel][rowLabel] = [...obj[sectionLabel][rowLabel], number];
                      }
                    
                    // Row not present, add it
                    } else {
                      obj[sectionLabel][rowLabel] = [number];
                    }
    
                  // Section not present, add it
                  } else {
                    obj[sectionLabel] = {
                      [rowLabel]: [number],
                    };
                  }
                }
              });
            }
          });

          const capturedTime = new Date().toISOString();
          dispatch(addSeats({ id: selectedSearchId, seats: obj, time: capturedTime }));

          Alert.alert('Seats Added', 'Go to "Seats" tab to see', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error parsing WebView message", error);
    }
  };

  const handleSearch = () => {
    if (selectedUrl) {
      setWebViewUrl(selectedUrl); // Set URL to trigger search
    }
  };

  const handleReset = () => {
    setWebViewUrl('');
    setTimeout(() => {
      setWebViewUrl(selectedUrl);
    }, 500);
  }

  const handleManualReload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload(); // Reload without unmounting
    }
  };

  return (
    <Screen style={styles.screen}>
      {loading && (
        <View style={styles.activity}>
          <ActivityIndicator size={'large'} color={colors.primary}/>
        </View>
      )}
      {webViewUrl && (
        <WebView
          ref={webViewRef}
          style={{ flex: 1 }}
          source={{ uri: webViewUrl }}
          injectedJavaScript={injectedJS}
          onMessage={onMessage}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadProgress={({ nativeEvent }) => {
            if (nativeEvent.progress) {
              setLoading(false);
            }
          }}/>
      )}
      <View style={styles.button}>
        {webViewUrl === selectedUrl ? (
          <PrimaryButton textKey='Reset Search' onPress={handleReset}/>
        ) : (
          <PrimaryButton textKey='Search.Seats' onPress={handleSearch}/>
        )}
        {webViewUrl && (
          <SecondaryButton textKey='Reload' onPress={handleManualReload}/>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'flex-end',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 10,
  },
});
