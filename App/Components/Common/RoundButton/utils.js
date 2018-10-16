import Colors from '../../../Themes/Colors';

export const getPalette = (status, reverse) => {
  switch (status) {
    case 'default':
      return {
        fontColor: !reverse ? Colors.white : Colors.actionYellow,
        bgColor: !reverse ? Colors.actionYellow : Colors.white,
        borderColor: Colors.actionYellow,
      };
    case 'primary':
      return {
        fontColor: !reverse ? Colors.white : Colors.grass,
        bgColor: !reverse ? Colors.grass : Colors.white,
        borderColor: Colors.grass,
      };
    case 'secondary':
      return {
        fontColor: !reverse ? Colors.white : Colors.gray,
        bgColor: !reverse ? Colors.gray : Colors.white,
        borderColor: Colors.gray,
      };
    case 'warning':
      return {
        fontColor: !reverse ? Colors.white : Colors.negative,
        bgColor: !reverse ? Colors.negative : Colors.white,
        borderColor: Colors.negative,
      };
    case 'info':
      return {
        fontColor: !reverse ? Colors.white : Colors.info,
        bgColor: !reverse ? Colors.info : Colors.white,
        borderColor: Colors.info,
      };
    case 'ghost':
      return {
        fontColor: !reverse ? Colors.black : Colors.white,
        bgColor: !reverse ? Colors.white : Colors.black,
        borderColor: Colors.darkGray,
      };
    case 'dark':
      return {
        fontColor: !reverse ? Colors.white : Colors.black,
        bgColor: !reverse ? Colors.black : Colors.white,
        borderColor: Colors.black,
      };
    case 'translucid':
      return {
        fontColor: Colors.primaryGreen,
        bgColor: Colors.white85,
        borderColor: Colors.shade,
      };
    default:
      throw new Error('Unknown status');
  }
};

export const getPixelsFromSize = (size) => {
  switch (size) {
    case 'S':
      return '32px';
    case 'M':
      return '40px';
    case 'L':
      return '48px';
    case 'XL':
      return '58px';
    default:
      throw new Error('Unknown size');
  }
};
