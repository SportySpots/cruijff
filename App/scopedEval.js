/* eslint-disable no-unused-vars */
import _React from 'react';
import _expect from 'expect';

import { ref as _ref } from './App';

const scopedEval = (input) => {
  const React = _React;
  const ref = _ref.ref;
  const expect = _expect;
  try {
    // eslint-disable-next-line no-eval
    return eval(input);
  } catch (e) {
    return JSON.stringify(e);
  }
};

export default scopedEval;
