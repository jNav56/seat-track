import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useThemes } from '@/providers/Themes/ThemeProvider';
import {
  selectEntitySearches,
  selectSelectedSearch,
} from '@/store/states/Searches/selectors';
import { addSearch, setSelectedSearch } from '@/store/states/Searches/slice';
import { Screen } from '@/controls/Screen';
import { View } from "@/controls/View";
import { Input } from '@/controls/Input';
import { TopHeader } from '@/controls/Headers/TopHeader';
import { PrimaryButton } from '@/controls/Buttons/Buttons';
import { LocalizedText } from '@/controls/LocalizedText';
import { CircleButton } from '@/controls/Buttons/CircleButton';
import { Separator } from '@/controls/Separator';

export const Home = () => {
  const { colors } = useThemes();
  const dispatch = useDispatch();
  const [showInputs, setShowInputs] = useState(false);
  const [label, setLabel] = useState('');
  const [labelError, setLabelError] = useState('');
  const [url, setUrl] = useState('');
  const selectedSearchId = useSelector(selectSelectedSearch);
  const searches = useSelector(selectEntitySearches);
  const validLabelAndUrl = label && url;
  const selectedText =
    selectedSearchId ? searches[selectedSearchId].label : 'No selected search';

  const selectedTextStyle = {
    color: selectedSearchId ? colors.secondary : colors.error,
  };

  const onAddSearch = () => {
    setShowInputs((prev) => !prev);
  };

  const onSubmitSearch = () => {
    const newId = label.split(' ').join('-');
    if (searches[newId]) {
      setLabelError('Choose different label name, already exists');
    } else {
      dispatch(addSearch({
        id: newId,
        label,
        url,
        lastFetch: '',
        seats: {},
      }));
      Alert.alert('New search added', '', [
        {
          text: 'OK',
          onPress: () => {
            setShowInputs(false);
            setLabel('');
            setUrl('');
          },
        },
      ]);
      dispatch(setSelectedSearch(newId));
    }
  };

  return (
    <Screen>
      <TopHeader textKey='Home' disableHeader/>
      <Pressable
        style={styles.container}
        onPress={() => { Keyboard.dismiss() }}>
        <View>
          <LocalizedText textKey='Current selected search:'/>
          <LocalizedText
            type='label'
            style={selectedTextStyle}
            textKey={selectedText}/>
        </View>
        {showInputs ? (
          <>
            <Input
              label='Search Label'
              value={label}
              onChangeText={setLabel}
              onFocus={() => { setLabelError('') }}
              error={labelError}/>
            <Input label='Url' value={url} onChangeText={setUrl}/>
            <Separator vertical={20}/>
            <CircleButton icon='arrow.turn.up.left' onPress={onAddSearch} label='Back'/>
          </>
        ) : (
          <CircleButton icon='plus' onPress={onAddSearch} label='Add Search'/>
        )}
      </Pressable>
      {showInputs && (
        <PrimaryButton
          style={styles.button}
          textKey='Set New Search'
          onPress={onSubmitSearch}
          disabled={!validLabelAndUrl || !!labelError}/>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    gap: 15,
  },
  button: {
    marginBottom: 20,
  },
});
