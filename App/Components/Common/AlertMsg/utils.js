const getPalette = (status) => {
  switch (status) {
    case 'success':
      return {
        fontColor: 'grass',
        bgColor: 'grass20',
        iconName: 'alert',
      };
    case 'error':
      return {
        fontColor: 'negative',
        bgColor: 'negative20',
        iconName: 'alert-circle',
      };
    case 'warning':
      return {
        fontColor: 'notify',
        bgColor: 'notify20',
        iconName: 'alert',
      };
    case 'info':
      return {
        fontColor: 'info',
        bgColor: 'info20',
        iconName: 'alert',
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
