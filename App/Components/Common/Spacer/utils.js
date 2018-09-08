const getPixelsFromSize = (size) => {
  switch (size) {
    case 'S':
      return 4;
    case 'M':
      return 8;
    case 'L':
      return 16;
    case 'XL':
      return 24;
    case 'XXL':
      return 32;
    default:
      throw new Error('Unknown size');
  }
};

export default getPixelsFromSize;
