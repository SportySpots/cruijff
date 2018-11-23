import Colors from '../../../Themes/Colors';

const getPalette = (status, reverse) => {
  switch (status) {
    case 'success':
      return {
        fontColor: !reverse ? Colors.white : Colors.grass,
        bgColor: !reverse ? Colors.grass : Colors.white,
        borderColor: Colors.grass,
      };
    case 'error':
      return {
        fontColor: !reverse ? Colors.white : Colors.negative,
        bgColor: !reverse ? Colors.negative : Colors.white,
        borderColor: Colors.negative,
      };
    case 'warning':
      return {
        fontColor: !reverse ? Colors.white : Colors.notify,
        bgColor: !reverse ? Colors.notify : Colors.white,
        borderColor: Colors.notify,
      };
    case 'info':
      return {
        fontColor: !reverse ? Colors.white : Colors.info,
        bgColor: !reverse ? Colors.info : Colors.white,
        borderColor: Colors.info,
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
