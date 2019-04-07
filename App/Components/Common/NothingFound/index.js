import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
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
const NothingFound = ({ iconSet, iconName, text }) => (
  <Container>
    <Icon
      iconSet={iconSet}
      iconName={iconName}
      size={96}
      color="link"
    />
    <Text size="L" color="link" center>
      {text}
    </Text>
  </Container>
);

NothingFound.propTypes = {
  iconSet: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
