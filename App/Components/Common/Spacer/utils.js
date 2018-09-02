const getPixelsFromSize = (size) => {
  switch (size) {
    case 'S':
      return 4;
    case 'M':
      return 8;
    case 'L':
      return 16;
    default:
      throw new Error('Unknown size');
  }
};

export default getPixelsFromSize;
