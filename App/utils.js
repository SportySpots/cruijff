import Config from 'react-native-config';

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
    .concat(height ? `&h=${height}` : '')
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


/*
const getImageUrl = image => (
  image.startsWith('http') ? image : `${Config.SEEDORF_HOST}${image}`
);

const DEFAULT_SPOT_IMG = 'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/SpotImages/spot-placeholder.png';

export const getSpotImages = images => (
  images && images.length > 0
    ? images.map(({ image }) => getImageUrl(image))
    : [DEFAULT_SPOT_IMG]
);
*/