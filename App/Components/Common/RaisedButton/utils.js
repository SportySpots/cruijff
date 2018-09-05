import Colors from '../../../Themes/Colors';

export const getPalette = (status) => {
  switch (status) {
    case 'default':
      return {
        fontColor: Colors.white,
        bgColor: Colors.actionYellow,
      };
    case 'primary':
      return {
        fontColor: Colors.white,
        bgColor: Colors.grass,
      };
    case 'secondary':
      return {
        fontColor: Colors.white,
        bgColor: Colors.lightGray,
      };
    case 'warning':
      return {
        fontColor: Colors.white,
        bgColor: Colors.negative,
      };
    case 'info':
      return {
        fontColor: Colors.white,
        bgColor: Colors.info,
      };
    case 'ghost':
      return {
        fontColor: Colors.black,
        bgColor: Colors.white,
      };
    default:
      throw new Error('Unknown status');
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
