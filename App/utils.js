import Config from 'react-native-config';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';
import { Buffer } from 'buffer';
import globalRefs from './globalRefs';
import { CITIES } from './Context/SpotFilters';

/* eslint-disable no-param-reassign */
export const addModelState = (reactComponentInstance, modalName, isOpen = false) => {
  reactComponentInstance.modals = reactComponentInstance.modals || {};
  reactComponentInstance.state.modals = reactComponentInstance.state.modals || {};
  const setState = (state) => {
    reactComponentInstance.setState({
      modals: { ...reactComponentInstance.state.modals, [modalName]: state },
    });
  };
  reactComponentInstance.modals[modalName] = {
    show: () => setState(true),
    hide: () => setState(false),
    get isVisible() {
      return reactComponentInstance.state.modals[modalName];
    },
  };
  reactComponentInstance.state.modals[modalName] = isOpen;
};

export function makeNumGenerator() {
  let i = -1;
  return () => {
    i += 1;
    return i;
  };
}

const convertS3ToImgix = ({ image, height, width }) => (
  image.replace('https://s3.amazonaws.com/sportyspots-prd', 'http://sportyspots.imgix.net')
    .concat('?auto=compress')
    // .concat(height ? `&h=${height}` : '')
    .concat(width ? `&w=${width}` : '')
);

const getImageUrl = ({ image, height, width }) => (
  image.startsWith('http') // TODO: this should be https://s3.amazonaws.com/sportyspots-
    ? convertS3ToImgix({ image, height, width })
    : `${Config.SEEDORF_HOST}${image}`
);

const DEFAULT_SPOT_IMG = 'https://raw.githubusercontent.com/SportySpots/cruijff/master/App/Images/spot-placeholder.png';

export const getSpotImages = ({ images, height, width }) => {
  if (!height || !width) {
    throw new Error('Height | width is not defined');
  }

  return images && images.length > 0
    ? images.map(({ image }) => getImageUrl({ image, height, width }))
    : [DEFAULT_SPOT_IMG];
};

const routeToString = (route, depth = 0) => {
  let str = route.routeName || 'ROOT';
  if (route.routes) {
    str += '\n' + route.routes.map((subRoute, idx) => {
      const isActive = (idx === route.index);
      return ' '.repeat(3 * depth) + (isActive ? ' * ' : '   ') + routeToString(subRoute, depth + 1);
    }).join('\n');
  }
  return str;
};

export const logNavigationState = (route = globalRefs.rootNavigator.state.nav) => {
  console.log(routeToString(route));
};


/**
 * errors = {
 *  email: ['This field must be unique.'],
 *  password1: ['This password is too short. It must contain at least 8 characters.']
 * }
 * OR
 * errors = ['Invalid Spot. Spot being assigned doesnt have the already associated sport']
 * OR
 * errors = 'Email already in use'
*/
export const curateErrors = (curateFieldName, curateErrorMsg) => (errors) => {
  if (isString(errors)) {
    return { [curateFieldName(null)]: [errors] }; // curatedErrors
  }

  if (Array.isArray(errors)) {
    return { [curateFieldName(null)]: errors }; // curatedErrors
  }

  // In case errors is an object
  const keys = Object.keys(errors);
  const curatedErrors = {};

  keys.forEach((key) => {
    const arrayError = castArray(errors[key]);
    const curatedArray = arrayError.map(errorMsg => (curateErrorMsg(errorMsg)));
    curatedErrors[curateFieldName(key)] = curatedArray;
  });

  return curatedErrors;
};

export const decodeJWTToken = (token) => {
  if (!token) {
    return null;
  }
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
};

export const mergeCoords = (locationCoords, locationEnabled, cityID) => {
  if (locationEnabled) {
    return locationCoords;
  }
  const cityObj = CITIES.find(c => c.id === cityID);
  if (cityObj) {
    return cityObj.coords;
  }
  return CITIES[0].coords;
};
