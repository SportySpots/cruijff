import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../Themes/Colors';

const Container = styled.View`
  height: 48px;
  flex-direction: column;
  justify-content: center;
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const StackBackHeader = ({ onPress }) => (
  <Container>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Horizontal>
        <Icon name="arrow-back" size={24} color={Colors.black} />
      </Horizontal>
    </TouchableOpacity>
  </Container>
);

StackBackHeader.propTypes = {
  onPress: PropTypes.func,
};

StackBackHeader.defaultProps = {
  onPress: () => {},
};

export default StackBackHeader;
