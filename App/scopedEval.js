/* eslint-disable no-unused-vars */
import _React from 'react';
import _expect from 'expect';
import { AsyncStorage as _AsyncStorage } from "react-native";

import _refs from './globalRefs';

const scopedEval = (input) => {
  const React = _React;
  const refs = _refs;
  const AsyncStorage = _AsyncStorage;

  const getElementById = (node, id) => {
    if (node.props && node.props.id === id) { return node; }
    const children = node.props ? React.Children.toArray(node.props.children) : [];
    if (node._reactInternalFiber && node._reactInternalFiber.child && node._reactInternalFiber.child.stateNode) {
      children.push(node._reactInternalFiber.child.stateNode);
    }
    const results = children.map(child => getElementById(child, id)).filter(c => c !== null);
    if (results.length > 0) { return results[0]; }
    return null;
  };

  // trying to get the root App node is difficult, below is available in a DEV build, but not in a test build somehow.
  // refs.app = refs.apolloProvider._reactInternalFiber._debugOwner.stateNode;
  // const appNode = _refs.app;
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
