export type Fonts = typeof fonts;
export type FontType = keyof typeof interFontWeights;
export type FontPresets = keyof typeof presets;
export type FontSizesType = keyof typeof fontSizes;

const interFontWeights = {
  thin: 100,        // Inter-Thin
  extraLight: 200,  // Inter-ExtraLight
  light: 300,       // Inter-Light
  regular: 400,     // Inter-Regular
  medium: 500,      // Inter-Medium
  semiBold: 600,    // Inter-SemiBold
  bold: 700,        // Inter-Bold
  extraBold: 800,   // Inter-ExtraBold
  black: 900,       // Inter-Black
  italic: 400,      // Inter Italic
};

/** 
 * Font size and line height combo reccomendations
 * 
 * Size   Line Height
 * 10px:	12px - 14px
 * 12px:	14px - 18px
 * 14px:	17px - 21px
 * 16px:	20px - 24px
 * 18px:	22px - 27px
 * 20px:	24px - 30px
 * 24px:	28px - 36px
*/
const fontSizes = {
  small: {
    fontSize: 14,
    lineHeight: 18,
  },
  large: {
    fontSize: 20,
    lineHeight: 28,
  },
  oneXL: {
    fontSize: 22,
    lineHeight: 22,
  },
  twoXL: {
    fontSize: 24,
    lineHeight: 32,
  },
  threeXL: {
    fontSize: 28,
    lineHeight: 36,
  },
}

const fontFamilies = {
  primary: 'Inter',
  secondary: 'SpaceMono',
};

const presets = {
  common: {
    fontWeight: interFontWeights.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  commonSB: {
    fontWeight: interFontWeights.semiBold,
    fontSize: 15,
    lineHeight: 24,
  },
  smallStrong: {
    fontWeight: interFontWeights.medium,
    fontSizes: 13,
    lineHeight: 16,
  },
  body: {
    fontWeight: interFontWeights.regular,
    fontSize: 14,
    lineHeight: 18,
  },
  bodyMedium: {
    fontWeight: interFontWeights.medium,
    fontSize: 14,
    lineHeight: 18,
  },
  header: {
    fontWeight: interFontWeights.semiBold,
    fontSize: 22,
    lineHeight: 22,
  },
  label: {
    fontWeight: interFontWeights.semiBold,
    fontSize: 16,
    lineHeight: 20,
  },
  subtitle: {
    fontWeight: interFontWeights.regular,
    fontSize: 20,
    lineHeight: 28,
  },
  title: {
    fontWeight: interFontWeights.semiBold,
    fontSize: 28,
    lineHeight: 36,
  },
};

export const fonts = {
  presets: presets,
  families: fontFamilies,
  weight: interFontWeights,
  sizePreset: fontSizes,
};