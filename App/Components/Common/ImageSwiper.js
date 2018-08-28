import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Image, ViewPropTypes } from 'react-native';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageSwiper = ({ images, style }) => (
  <Swiper style={{ flex: 1, ...style }}>
    {images.map(src => (
      <Image
        key={src}
        style={{ flex: 1 }}
        source={{ uri: src }}
      />
    ))}
  </Swiper>
);

ImageSwiper.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  style: ViewPropTypes.style,
};

ImageSwiper.defaultProps = {
  style: {},
};

export default ImageSwiper;
