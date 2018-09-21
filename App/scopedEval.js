/* eslint-disable no-unused-vars */
import _React from 'react';
import _expect from 'expect';
// eslint-disable-next-line quotes
import { AsyncStorage as _AsyncStorage } from "react-native";

import _refs from './globalRefs';

const scopedEval = (input) => {
  const React = _React;
  const refs = _refs;
  const AsyncStorage = _AsyncStorage;

  const expect = _expect;
  try {
    return ({
      hasError: false,
      error: null,
      // eslint-disable-next-line no-eval
      response: eval(input),
    });
  } catch (e) {
    return ({
      hasError: true,
      error: e.toString(),
      response: null,
    });
  }
};

export default scopedEval;
