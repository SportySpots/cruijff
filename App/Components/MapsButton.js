import React from 'react';
import Colors from '../Themes/Colors';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const MapsButton = props => (
  <TouchableOpacity {...props}>
    <ButtonContainer>
      <Icon name="place" size={24} color={Colors.primaryGreen} />
    </ButtonContainer>
  </TouchableOpacity>
);

export default MapsButton;

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${Colors.white20};
  border-radius: 50px;
  shadow-color: #000;
  shadow-opacity: 0.2;
`;
