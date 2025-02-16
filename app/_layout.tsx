import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/store'; 
import 'react-native-reanimated';
import * as Localization from 'expo-localization';
import i18n from '@/i18n/i18n';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ThemesProvider } from '@/providers/Themes/ThemeProvider';
import { RootStackNavigator } from '../navigation/RootNavigation';


const userLocale = Localization.getLocales()?.[0];

switch (userLocale?.languageCode) {
  case 'es':
    i18n.changeLanguage('es');
    break;
  default:
    i18n.changeLanguage('en-US');
    break;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BottomSheetModalProvider>
          <ThemesProvider>
            <RootStackNavigator />
            <StatusBar style="auto" />
          </ThemesProvider>
        </BottomSheetModalProvider>
      </PersistGate>
    </Provider>
  );
}

export default gestureHandlerRootHOC(RootLayout);
