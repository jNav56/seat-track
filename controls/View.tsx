import { View as NativeView, type ViewProps } from 'react-native';
import { useThemes } from '@/providers/Themes/ThemeProvider';

export const View =({ style, ...otherProps }: ViewProps) => {
  const { colors: { background: backgroundColor } } = useThemes();

  return <NativeView style={[{ backgroundColor }, style]} {...otherProps} />;
}
