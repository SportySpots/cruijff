import React from 'react';
import Swiper from 'react-native-swiper';
import { Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageSwiper = ({ images, style }) => (
  <Swiper style={{ flex: 1, ...style }}>
    {images.map((src, index) => (
      <Image
        key={index}
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
