import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import NavDot from '.';

const Container = ({ active }) => (
  <View style={{ backgroundColor: 'black', height: 100 }}>
    <NavDot active={active} />
  </View>
);

Container.propTypes = {
  active: PropTypes.bool,
};

Container.defaultProps = {
  active: false,
};

storiesOf('Common.NavDot', module)
  .add('NavDot default', () => (
    <Container />
  ))
  .add('NavDot active', () => (
    <Container active />
  ));
