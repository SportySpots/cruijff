import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';

const CenteredActivityIndicator = () => (
  <Centered>
    <ActivityIndicator size="large" color={Colors.primaryGreen} />
  </Centered>
);
export default CenteredActivityIndicator;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
