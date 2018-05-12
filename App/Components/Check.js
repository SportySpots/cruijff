import React from 'react';
import Colors from '../Themes/Colors';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Check = props => (
  <TouchableOpacity {...props}>
    <ButtonContainer>
      <Icon name="check-box" size={48} color={Colors.white} />
    </ButtonContainer>
  </TouchableOpacity>
);

export default Check;

const ButtonContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;
