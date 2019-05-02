const getPixelsFromSize = (size) => {
  switch (size) {
    case 'XS':
      return 2;
    case 'S':
      return 4;
    case 'M':
      return 8;
    case 'ML':
      return 12;
    case 'L':
      return 16;
    case 'XL':
      return 24;
    case 'XXL':
      return 32;
    case 'XXXL':
      return 56;
    default:
      throw new Error('Unknown size');
  }
};

export default getPixelsFromSize;
