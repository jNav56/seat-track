import {
  TextStyle,
  Text as NativeText,
  type TextProps as NativeTextProps,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemes } from '@/providers/Themes/ThemeProvider';
import { FontPresets } from '@/providers/Themes/fonts';

export interface TextProps extends NativeTextProps {
  textKey: string;
  textInserts?: { [key: string]: string };
  type?: FontPresets;
  center?: boolean;
  subText?: boolean;
  error?: boolean;
}

export const LocalizedText = ({
  textKey,
  textInserts = {},
  style,
  type = 'common',
  center,
  subText,
  error,
  ...rest
}: TextProps) => {
  const { t } = useTranslation();
  const { fonts, colors } = useThemes();

  // By default the style will always be
  const textStyle = {
    fontFamily: fonts.families.primary,
    ...fonts.presets[type],
    ...(center ? { textAlign: 'center' } : {}),
    color:
      error ?
      colors.error :
      subText ? colors.subText : colors.text,
  } as TextStyle;

  return (
    <NativeText
      style={[textStyle, style]}
      {...rest}>
      {t(textKey, textInserts)}
    </NativeText>
  );
};
