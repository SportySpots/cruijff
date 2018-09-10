import Colors from './Colors';

const type = {
  base: 'Rajdhani-Regular',
  bold: 'Rajdhani-Bold',
  emphasis: 'Rajdhani-SemiBold',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const style = {
  L: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 32,
    color: Colors.black,
    // lineHeight: 50
  },
  ML: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 28,
    lineHeight: 42,
  },
  M: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 18,
    lineHeight: 27,
  },
  SM: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  S: {
    fontFamily: 'Rajdhani-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
};

export default {
  type,
  size,
  style,
};
