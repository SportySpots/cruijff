import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Footer from '../DarkFooter';

// TODO: refactor, move to common folder, try to use in PlanGame screens
/* ScreenSlider is using the same interface as FlatList (data, renderItem, keyExtractor) */
export default class ScreenSlider extends Component {
  static propTypes = {
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func,
    data: PropTypes.array,
    showNext: PropTypes.bool,
    onDone: PropTypes.func,
  };

  static defaultProps = {
    renderItem: item => <Text>{JSON.stringify(item)}</Text>,
    keyExtractor: (item, index) => index,
    data: ['No data'],
    showNext: true,
  };

  constructor() {
    super();

    this.state = {
      currentPage: 0,
    };
  }

  // componentDidMount() {
  //   super.componentDidMount();
  //
  // }

  onIndexChanged = (index) => {
    this.setState({ currentPage: index });
  };

  goNext = () => {
    if (this.state.currentPage + 1 < this.props.data.length) {
      this.swiper.scrollBy(1);
    } else {
      this.props.onDone && this.props.onDone();
    }
  };

  render() {
    const swiperScreens = this.props.data.map((item, index) => (
      <View style={{ flex: 1 }} key={this.props.keyExtractor(item, index)}>
        {this.props.renderItem({ item })}
      </View>
    ));

    return (
      <View style={{ flex: 1 }}>
        <Swiper
          loop={false}
          showsPagination={false}
          ref={(ref) => {
            this.swiper = ref;
          }}
          onIndexChanged={this.onIndexChanged}
        >
          {swiperScreens}
        </Swiper>
        <Footer
          showNext={this.props.showNext}
          numPages={this.props.data.length}
          buttonNextText={
            this.props.footerText &&
            this.props.footerText(this.props.data[this.state.currentPage], this.state.currentPage)
          }
          currentPage={this.state.currentPage}
          onNext={this.goNext}
          showBack={false}
        />
      </View>
    );
  }
}
