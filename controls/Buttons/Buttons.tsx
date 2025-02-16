import {
  StyleSheet,
  StyleProp,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from 'react-native';
import { LocalizedText } from '@/controls/LocalizedText';
import { ViewStyle } from 'react-native';
import { useThemes } from '@/providers/Themes/ThemeProvider';

interface IProps extends PressableProps {
  textKey: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textColor?: string;
  backgroundColor?: string;
}

export const PrimaryButton = ({
  textKey,
  style,
  isLoading,
  backgroundColor,
  ...rest
}: IProps) => {
  const { colors } = useThemes();
  const bgColor = backgroundColor ?? colors.buttonBg;
  const textColor = colors.invertText;

  return (
    <Button
      textKey={textKey}
      style={style}
      isLoading={isLoading}
      textColor={textColor}
      backgroundColor={bgColor}
      {...rest}/>
  );
};

export const SecondaryButton = ({
  textKey,
  style,
  isLoading,
  textColor,
  ...rest
}: IProps) => {
  const { colors } = useThemes();
  const backgroundColor = colors.background;
  const txtColor = textColor ?? colors.primary;

  const buttonStyle = [
    { borderColor: txtColor, borderWidth: 1 },
    style,
  ];

  return (
    <Button
      textKey={textKey}
      style={buttonStyle}
      isLoading={isLoading}
      textColor={txtColor}
      backgroundColor={backgroundColor}
      {...rest}/>
  );
};

const Button = ({
  textKey,
  style,
  isLoading,
  textColor,
  backgroundColor,
  ...pressableProps
}: IProps) => {
  const getButtonStyle = ({ pressed }: { pressed: boolean }) => [
    styles.button,
    {
      backgroundColor,
      opacity: pressed || pressableProps.disabled ? 0.5 : 1,
    },
    style,
  ];

  const textStyle = [
    styles.buttonText,
    { color: textColor }
  ];

  return (
    <Pressable
      style={getButtonStyle}
      {...pressableProps}>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <LocalizedText
          textKey={textKey}
          type='bodyMedium'
          style={textStyle}/>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 0.16,
  },
});