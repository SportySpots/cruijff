const trimLeft = (s) => {
  while (s.charAt(0) === ' ') {
    s = s.substr(1);
  }
  return s;
};

export default trimLeft;
