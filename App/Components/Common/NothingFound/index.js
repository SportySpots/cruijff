import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../Text';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: pass iconSet and iconName props
const NothingFound = ({ icon, text }) => (
  <Container>
    <Icon
      iconSet="MaterialCommunityIcons"
      iconName={icon}
      size={96}
      color="link"
    />
    <Text size="L" color="link" center>
      {text}
    </Text>
  </Container>
);

NothingFound.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
