import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Dimensions } from 'react-native';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { width: WINDOW_WIDTH } = Dimensions.get('window');

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageSwiper = ({ images }) => (
  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
  >
    {images.map(src => (
      <Image
        key={src}
        style={{ flex: 1 }}
        source={{ uri: src }}
        width={WINDOW_WIDTH}
      />
    ))}
  </ScrollView>
);

ImageSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

ImageSwiper.defaultProps = {
  images: [],
};

export default ImageSwiper;
