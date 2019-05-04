import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CenteredActivityIndicator = ({ secondary }) => (
  <Centered>
    <ActivityIndicator
      size="large"
      color={secondary ? Colors.actionYellow : Colors.primaryGreen}
    />
  </Centered>
);

CenteredActivityIndicator.propTypes = {
  secondary: PropTypes.bool,
};

CenteredActivityIndicator.defaultProps = {
  secondary: false,
};

export default CenteredActivityIndicator;
