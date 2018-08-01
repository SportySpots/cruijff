import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Text from './Text';

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const NotFoundText = styled(Text.L)`
  color: #ccc;
  text-align: center;
`;

const NothingFound = ({ icon, text }) => (
  <Container>
    <Icon name={icon} size={96} color="#ccc" />
    <NotFoundText>{text}</NotFoundText>
  </Container>
);

NothingFound.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
