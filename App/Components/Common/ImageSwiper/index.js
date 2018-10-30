import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ImageSwiper = ({ images }) => (
  <Swiper style={{ flex: 1 }}>
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
};

ImageSwiper.defaultProps = {
  images: [],
};

export default ImageSwiper;
