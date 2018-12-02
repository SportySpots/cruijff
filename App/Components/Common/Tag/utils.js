import Colors from '../../../Themes/Colors';

const getPalette = (status, reverse) => {
  switch (status) {
    case 'success':
      return {
        fontColor: !reverse ? Colors.black : Colors.grass,
        bgColor: !reverse ? Colors.grass20 : Colors.white,
        borderColor: Colors.grass,
      };
    case 'error':
      return {
        fontColor: !reverse ? Colors.black : Colors.negative,
        bgColor: !reverse ? Colors.negative20 : Colors.white,
        borderColor: Colors.negative,
      };
    case 'warning':
      return {
        fontColor: !reverse ? Colors.black : Colors.notify,
        bgColor: !reverse ? Colors.notify20 : Colors.white,
        borderColor: Colors.notify,
      };
    case 'info':
      return {
        fontColor: !reverse ? Colors.black : Colors.info,
        bgColor: !reverse ? Colors.info20 : Colors.white,
        borderColor: Colors.info,
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
