const getInputPalette = (theme) => {
  switch (theme) {
    case 'black':
      return {
        fontColor: 'black',
        baseColor: 'black',
        tintColor: 'primaryGreen',
        iconColor: 'black',
        disabledColor: 'gray',
        errorColor: 'error',
        lineWidth: 0.5,
      };
    case 'white':
      return {
        fontColor: 'white',
        baseColor: 'white',
        tintColor: 'white',
        iconColor: 'white',
        disabledColor: 'gray',
        errorColor: 'error',
        lineWidth: 1,
      };
    case 'transparent':
      return {
        fontColor: 'black',
        baseColor: 'black',
        tintColor: 'black',
        iconColor: 'black',
        disabledColor: 'gray',
        errorColor: 'red',
        lineWidth: 0,
      };
    case 'mix':
      return {
        fontColor: 'black',
        baseColor: 'white',
        tintColor: 'white',
        iconColor: 'white',
        disabledColor: 'gray',
        errorColor: 'error',
        lineWidth: 1,
      };
    default:
      throw new Error('Unknown status');
  }
};

export default getInputPalette;
