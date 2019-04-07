import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../Text';
import Spacer from '../Spacer';
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
const MaxWidth = styled.View`
  width: 100%;
  max-width: 270px;
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
    <Spacer size="XXL" />
    <MaxWidth>
      <Text size="L" color="link" center>
        {text}
      </Text>
    </MaxWidth>
  </Container>
);

NothingFound.propTypes = {
  iconSet: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
