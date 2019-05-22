/* eslint-disable no-unused-vars */
import _React from 'react';
import _expect from 'expect';
import _AsyncStorage from '@react-native-community/async-storage';
import _refs from './globalRefs';
import config from './config';

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

export const setupDetoxConnection = () => {
  try {
    console.warn('running a test image. not good if in production');
    console.log('config', config);

    // eslint-disable-next-line no-undef
    const ws = new WebSocket(config.testHostUrl);

    ws.onopen = () => {
      console.log('RN <-> detox connected');
    };

    ws.onmessage = (e) => {
      // a message was received
      const result = scopedEval(e.data);
      Promise.resolve(result.response).then((val) => {
        try {
          ws.send(JSON.stringify({ hasError: false, error: null, response: val }));
        } catch (err) {
          ws.send(JSON.stringify({
            hasError: false,
            response: 'cannot jsonify',
            error: null,
          }));
        }
      });
    };

    ws.onerror = (e) => {
      // an error occurred
      console.warn(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  } catch (e) {
    console.warn(e);
  }
};

export default scopedEval;
