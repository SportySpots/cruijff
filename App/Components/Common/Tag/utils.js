import Colors from '../../../Themes/Colors';

const getPalette = (status) => {
  switch (status) {
    case 'success':
      return {
        bgColor: Colors.grass,
      };
    case 'error':
      return {
        bgColor: Colors.negative,
      };
    case 'warning':
      return {
        bgColor: Colors.notify,
      };
    case 'info':
      return {
        bgColor: Colors.info,
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
