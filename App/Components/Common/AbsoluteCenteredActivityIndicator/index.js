import React from 'react';
import styled from 'styled-components/native';
import CenteredActivityIndicator from '../CenteredActivityIndicator';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Absolute = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary This component needs a relative-positioned parent component to work
*/
const AbsoluteCenteredActivityIndicator = props => (
  <Absolute>
    <CenteredActivityIndicator {...props} />
  </Absolute>
);

AbsoluteCenteredActivityIndicator.propTypes = {
  ...CenteredActivityIndicator.propTypes,
};

export default AbsoluteCenteredActivityIndicator;
