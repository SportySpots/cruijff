const getPalette = (status, reverse) => {
  switch (status) {
    case 'success':
      return {
        fontColor: !reverse ? 'black' : 'grass',
        bgColor: !reverse ? 'grass20' : 'white',
        borderColor: 'grass',
      };
    case 'error':
      return {
        fontColor: !reverse ? 'black' : 'negative',
        bgColor: !reverse ? 'negative20' : 'white',
        borderColor: 'negative',
      };
    case 'warning':
      return {
        fontColor: !reverse ? 'black' : 'notify',
        bgColor: !reverse ? 'notify20' : 'white',
        borderColor: 'notify',
      };
    case 'info':
      return {
        fontColor: !reverse ? 'black' : 'info',
        bgColor: !reverse ? 'info20' : 'white',
        borderColor: 'info',
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getPalette;
