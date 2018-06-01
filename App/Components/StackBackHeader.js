import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from './Text';

const Container = styled.View`
  height: 48px;
  padding-left: 8px;
  padding-top: 8px;
  background-color: white;
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StackBackHeader = ({ title, onPress }) => (
  <Container>
    <TouchableOpacity onPress={onPress}>
      <Horizontal>
        <Icon name="keyboard-backspace" size={32} color={Colors.black} />
        <Text.M bold style={{ marginLeft: 8 }}>{title}</Text.M>
      </Horizontal>
    </TouchableOpacity>
  </Container>
);

StackBackHeader.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

StackBackHeader.defaultProps = {
  title: '',
  onPress: () => {},
};

export default StackBackHeader;
