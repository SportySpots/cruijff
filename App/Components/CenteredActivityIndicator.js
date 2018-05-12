import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const CenteredActivityIndicator = () => (
  <Centered>
    <ActivityIndicator size="large" color="#00ff00" />
  </Centered>
);
export default CenteredActivityIndicator;

const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
