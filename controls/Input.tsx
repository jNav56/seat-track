import { StyleProp, StyleSheet, TextInput, ViewStyle, type TextInputProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LocalizedText } from './LocalizedText';
import { View } from '@/controls/View';
import { RefObject } from 'react';
import { useThemes } from '@/providers/Themes/ThemeProvider';
import { IconSymbol } from './Icons/IconSymbol';
import { Pressable } from 'react-native-gesture-handler';

export const Input = ({
  inputRef,
  label,
  style,
  containerStyle,
  editable = true,
  placeholder,
  error,
  intent,
  redoAction,
  switchIntent,
  ...rest
}: {
  inputRef?: RefObject<TextInput>;
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  error?: string;
  intent?: 'fetching' | 'adding' | 'filtering';
  redoAction?: () => void;
  switchIntent?: () => void;
} & TextInputProps) => {
  const { t } = useTranslation();
  const { colors } = useThemes();
  const placeholderText = t(placeholder ?? '');

  const labelStyle = { paddingBottom: error ? 0 : 5 };

  const errorStyle = [
    styles.error,
    { color: colors.error },
  ];

  const inputStyle = [
    styles.textInput,
    {
      borderColor: error ? colors.error : colors.border,
      paddingStart: switchIntent ? 35 : 10,
      paddingEnd: redoAction ? 35 : 10,
    },
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <LocalizedText type='label' style={labelStyle} textKey={label}/>
      )}
      {error && (
        <LocalizedText style={errorStyle} textKey={error}/>
      )}
      <TextInput
        ref={inputRef}
        style={inputStyle}
        placeholder={placeholderText}
        placeholderTextColor={colors.border}
        editable={editable}
        {...rest}/>
      {redoAction && (
        <Pressable style={styles.redo} onPress={redoAction}>
          <IconSymbol
            size={25}
            color={colors.secondary}
            name='arrow.counterclockwise.circle'
          />
        </Pressable>
      )}
      {switchIntent && (
        <Pressable style={styles.add} onPress={switchIntent}>
          <IconSymbol
            size={25}
            color={colors.secondary}
            name={intent === 'adding' ? 'arrow.backward.circle' : 'plus.circle.fill'}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 16,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    paddingVertical: 6,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    color: 'black',
  },
  error: {
    fontSize: 12,
  },
  redo: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  add: {
    position: 'absolute',
    left: 5,
    bottom: 5,
  }
});