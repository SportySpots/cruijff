import Colors from '../../../Themes/Colors';

const getPalette = (status) => {
  switch (status) {
    case 'success':
      return {
        fontColor: Colors.grass,
        bgColor: Colors.grass20,
        iconName: 'alert',
      };
    case 'error':
      return {
        fontColor: Colors.negative,
        bgColor: Colors.negative20,
        iconName: 'alert-circle',
      };
    case 'warning':
      return {
        fontColor: Colors.notify,
        bgColor: Colors.notify20,
        iconName: 'alert',
      };
    case 'info':
      return {
        fontColor: Colors.info,
        bgColor: Colors.info20,
        iconName: 'alert',
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
