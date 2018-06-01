import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from '../Components/Text';

const DefaultHeader = ({ title }) => (
  <View style={{ marginLeft: 16 }}>
    <Text.M bold>{title}</Text.M>
  </View>
);

DefaultHeader.propTypes = {
  title: PropTypes.string,
};

export default DefaultHeader;
