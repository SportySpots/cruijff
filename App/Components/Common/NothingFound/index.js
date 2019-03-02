import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import Spacer from '../Spacer';

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
const NotFoundText = styled(Text.L)`
  color: ${Colors.link};
  text-align: center;
`;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const NothingFound = ({ icon, text }) => (
  <Container>
    <Icon name={icon} size={96} color={Colors.link} />
    <Spacer size="XXL" />
    <MaxWidth>
      <NotFoundText>{text}</NotFoundText>
    </MaxWidth>
  </Container>
);

NothingFound.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
