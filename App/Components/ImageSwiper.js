import React from 'react'
import Swiper from 'react-native-swiper'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

export default class ImageSwiper extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    style: View.propTypes.style
  }

  render () {
    return (
      <Swiper style={[{ flex: 1 }, this.props.style]}>
        {this.props.images.map((src, index) => (
          <Image key={index} style={{ flex: 1 }} source={{ uri: src }} />
        ))}
      </Swiper>
    )
  }
}
