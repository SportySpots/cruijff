import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Footer from '../../DarkFooter';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * ScreenSlider is using the same interface as FlatList (data, renderItem,
 * keyExtractor)
 */
class ScreenSlider extends Component {
  state = {
    currentPage: 0,
  }

  onIndexChanged = (index) => {
    this.setState({ currentPage: index });
  };

  goNext = () => {
    const { data, onDone } = this.props;
    const { currentPage } = this.state;

    if (currentPage + 1 < data.length) {
      this.swiper.scrollBy(1);
    } else if (onDone && typeof onDone === 'function') {
      onDone();
    }
  };

  render() {
    const {
      data,
      keyExtractor,
      renderItem,
      showNext,
      footerText,
    } = this.props;

    const { currentPage } = this.state;

    const slides = data.map((item, index) => (
      <View style={{ flex: 1 }} key={keyExtractor(item, index)}>
        {renderItem({ item })}
      </View>
    ));

    return (
      <View style={{ flex: 1 }}>
        <Swiper
          loop={false}
          showsPagination={false}
          ref={(ref) => { this.swiper = ref; }}
          onIndexChanged={this.onIndexChanged}
        >
          {slides}
        </Swiper>
        <Footer
          showNext={showNext}
          numPages={data.length}
          buttonNextText={footerText && footerText(data[currentPage], currentPage)}
          currentPage={currentPage}
          onNext={this.goNext}
          showBack={false}
        />
      </View>
    );
  }
}

ScreenSlider.propTypes = {
  renderItem: PropTypes.func,
  keyExtractor: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.any),
  showNext: PropTypes.bool,
  footerText: PropTypes.func,
  onDone: PropTypes.func,
};

ScreenSlider.defaultProps = {
  renderItem: item => <Text>{JSON.stringify(item)}</Text>,
  keyExtractor: (item, index) => index,
  data: ['No data'],
  showNext: true,
  footerText: () => {},
  onDone: () => {},
};

export default ScreenSlider;
