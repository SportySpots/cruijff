export const getPalette = (status, reverse) => {
  switch (status) {
    case 'default':
      return {
        fontColor: !reverse ? 'white' : 'actionYellow',
        bgColor: !reverse ? 'actionYellow' : 'white',
        borderColor: 'actionYellow',
      };
    case 'primary':
      return {
        fontColor: !reverse ? 'white' : 'grass',
        bgColor: !reverse ? 'grass' : 'white',
        borderColor: 'grass',
      };
    case 'secondary':
      return {
        fontColor: !reverse ? 'white' : 'gray',
        bgColor: !reverse ? 'gray' : 'white',
        borderColor: 'gray',
      };
    case 'warning':
      return {
        fontColor: !reverse ? 'white' : 'negative',
        bgColor: !reverse ? 'negative' : 'white',
        borderColor: 'negative',
      };
    case 'info':
      return {
        fontColor: !reverse ? 'white' : 'info',
        bgColor: !reverse ? 'info' : 'white',
        borderColor: 'info',
      };
    case 'ghost':
      return {
        fontColor: !reverse ? 'black' : 'white',
        bgColor: !reverse ? 'white' : 'black',
        borderColor: 'darkGray',
      };
    case 'dark':
      return {
        fontColor: !reverse ? 'white' : 'black',
        bgColor: !reverse ? 'black' : 'white',
        borderColor: 'black',
      };
    case 'translucid':
      return {
        fontColor: 'primaryGreen',
        bgColor: 'white85',
        borderColor: 'shade',
      };
    case 'facebook':
      return {
        fontColor: 'white',
        bgColor: 'facebook',
        borderColor: 'facebook',
      };
    case 'whatsapp':
      return {
        fontColor: 'white',
        bgColor: 'whatsapp',
        borderColor: 'whatsapp',
      };
    case 'email':
      return {
        fontColor: 'white',
        bgColor: 'grassDark',
        borderColor: 'grassDark',
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
