/* eslint-disable */
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

import './setup_faker';
import '../App/config';
// import DebugConfig from '../App/Config/DebugConfig';
import StorybookUI from './storybook';


// eslint-disable-next-line no-global-assign
__DEV__ = true;
export default StorybookUI;
