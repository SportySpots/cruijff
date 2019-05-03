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
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary This component needs a relative parent component to work
*/
const AbsoluteCenteredActivityIndicator = () => (
  <Absolute>
    <CenteredActivityIndicator />
  </Absolute>
);
export default AbsoluteCenteredActivityIndicator;
