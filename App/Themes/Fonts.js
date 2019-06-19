import { Dimensions } from 'react-native';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const isSmallPhone = WINDOW_WIDTH <= 320;

export const FontFamilies = {
  regular: 'Rajdhani-Regular',
  semibold: 'Rajdhani-SemiBold',
  bold: 'Rajdhani-Bold',
};

const Fonts = {
  XL: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 32 : 40,
  },
  L: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 24 : 32,
  },
  ML: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 18 : 24,
  },
  M: {
    fontFamily: FontFamilies.semibold,
    fontSize: isSmallPhone ? 16 : 18,
  },
  SM: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 14 : 16,
  },
  // TODO: rename to S
  SSM: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 12 : 14,
  },
  // TODO: rename to XS
  S: {
    fontFamily: FontFamilies.regular,
    fontSize: isSmallPhone ? 10 : 12,
  },
};

export default Fonts;
