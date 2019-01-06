import Colors from '../../../Themes/Colors';

export const getPalette = (variant) => {
  switch (variant) {
    case 'default':
      return {
        fontColor: Colors.white,
        bgColor: Colors.actionYellow,
        borderColor: Colors.actionYellow,
      };
    case 'primary':
      return {
        fontColor: Colors.white,
        bgColor: Colors.grass,
        borderColor: Colors.grass,
      };
    case 'secondary':
      return {
        fontColor: Colors.white,
        bgColor: Colors.gray,
        borderColor: Colors.gray,
      };
    case 'warning':
      return {
        fontColor: Colors.white,
        bgColor: Colors.negative,
        borderColor: Colors.negative,
      };
    case 'info':
      return {
        fontColor: Colors.white,
        bgColor: Colors.info,
        borderColor: Colors.info,
      };
    case 'ghost':
      return {
        fontColor: Colors.black,
        bgColor: Colors.white,
        borderColor: Colors.darkGray,
      };
    case 'facebook':
      return {
        fontColor: Colors.white,
        bgColor: Colors.facebook,
        borderColor: Colors.facebook,
      };
    case 'google':
      return {
        fontColor: Colors.black,
        bgColor: Colors.white,
        borderColor: Colors.shade,
      };
    default:
      throw new Error('Unknown variant');
  }
};

export const getPixelsFromSize = (size) => {
  switch (size) {
    case 'S':
      return {
        height: '32px',
        minWidth: '80px',
        borderRadius: '4px',
      };
    case 'M':
      return {
        height: '48px',
        minWidth: '100px',
        borderRadius: '8px',
      };
    default:
      throw new Error('Unknown size');
  }
};
