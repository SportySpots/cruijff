import React from 'react';
import Colors from '../Themes/Colors';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = (props) => {
  const { text, style, ...otherProps } = props;
  return (
    <TouchableOpacity {...otherProps}>
      <View style={[backButtonStyle.button, style]}>
        <Icon name="chevron-left" size={24} color="white" />
        <Text.L style={backButtonStyle.text}>{text.toUpperCase()}</Text.L>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const backButtonStyle = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
});
