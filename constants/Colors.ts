/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export type LightColors = keyof typeof colorsObj.light;
export type DarkColors = keyof typeof colorsObj.dark;
export type Colors = { [key in LightColors | DarkColors]: string };

const colorList = {
  white: '#FFF',
  softOrange: '#DE9266',
  orange: '#D06425',
  darkOrange: '#A6501D',
  brightOrange: '#E15E31',
  blue: '#2591D0',
  mistyGray: '#CED1DD',
  lightGray: '#C2C2C2',
  softGray: '#F3F5F7',
  gray: '#737888',
  iconGray: '#687076',
  black: '#000',
  charcoalBlack: '#494F5B',
  errorRed: '#ED4337',
};

const lightColors = {
  // Common
  background: colorList.white,
  primary: colorList.orange,
  secondary: colorList.blue,
  icon: colorList.iconGray,
  error: colorList.errorRed,
  reactBackground: '#A1CEDC',

  // Tabs
  tabActive: colorList.orange,
  tabInactive: colorList.gray,
  tabActiveStrong: colorList.darkOrange,
  tabActiveBG: colorList.softOrange,
  tabInactiveBg: colorList.softGray,

  // Text
  text: colorList.charcoalBlack,
  subText: colorList.gray,
  invertText: colorList.white,
  placeholder: colorList.lightGray,
  link: colorList.blue,
  subLink: colorList.gray,

  // Buttons
  buttonBg: colorList.orange,
  secondButtonBg: colorList.mistyGray,
  buttonIcon: colorList.black,
  buttonInvertIcon: colorList.white,
  bookmark: colorList.brightOrange,
  indicator: colorList.softOrange,

  // Borders
  border: colorList.lightGray,
  borderFocused: colorList.orange,
  secondBorder: colorList.mistyGray,
};

export const colorsObj = {
  light: lightColors,
  dark: {
    ...lightColors,
    reactBackground: '#1D3D47',
  },
};
