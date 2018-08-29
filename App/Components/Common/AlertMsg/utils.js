import Colors from '../../../Themes/Colors';

const getPalette = (status) => {
  switch (status) {
    case 'success':
      return {
        fontColor: Colors.grass,
        bgColor: Colors.grassTint,
        iconName: 'alert',
      };
    case 'error':
      return {
        fontColor: Colors.negative,
        bgColor: Colors.negativeTint,
        iconName: 'alert',
      };
    case 'warning':
      return {
        fontColor: Colors.notify,
        bgColor: Colors.notifyTint,
        iconName: 'alert',
      };
    case 'info':
      return {
        fontColor: Colors.info,
        bgColor: Colors.infoTint,
        iconName: 'alert',
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
