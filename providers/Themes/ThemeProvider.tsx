import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { fonts, Fonts } from './fonts';
import { colorsObj, Colors } from '@/constants/Colors';

const ThemeContext = createContext<{
  fonts: Fonts,
  colors: Colors,
}>({
  fonts,
  colors: colorsObj.light,
});

export const useThemes = () => {
  const value = useContext(ThemeContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <ThemeProvider />');
    }
  }
  return value;
}

export const ThemesProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const colors = useMemo(() =>
    (colorScheme === 'dark' ? colorsObj.dark : colorsObj.light), [colorScheme],
  );

  return (
    <ThemeContext.Provider value={{ fonts, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
