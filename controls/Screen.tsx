import { useThemes } from '@/providers/Themes/ThemeProvider';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const Screen = ({ children, style }: IProps) => {
  const { colors } = useThemes();
  const containerStyle = [
    styles.container,
    { backgroundColor: colors.background },
    style,
  ];

  return (
    <SafeAreaView style={containerStyle} edges={['right', 'left', 'top']}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
});