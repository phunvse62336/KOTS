const type = {
  bold: 'SFUIText-Bold',
  boldItalic: 'SFUIText-BoldItalic',
  heavy: 'SFUIText-Heavy',
  heavyItalic: 'SFUIText-HeavyItalic',
  light: 'SFUIText-Light',
  lightItalic: 'SFUIText-LightItalic',
  medium: 'SFUIText-Medium',
  mediumItalic: 'SFUIText-MediumItalic',
  regular: 'SFUIText-Regular',
  regularItalic: 'SFUIText-RegularItalic',
  semiBold: 'SFUIText-Semibold',
  semiBoldItalic: 'SFUIText-SemiboldItalic'
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.bold,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.bold,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.bold,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.bold,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.regular,
    fontSize: size.regular
  },
  boldNormal: {
    fontFamily: type.regular,
    fontSize: size.regular,
    fontWeight: 'bold'
  },
  description: {
    fontFamily: type.regular,
    fontSize: size.medium
  },
  small: {
    fontFamily: type.regular,
    fontSize: size.small
  }
};

export default {
  type,
  size,
  style
};
