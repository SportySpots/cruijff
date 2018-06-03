import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from '../Components/Text';

const Container = styled.View`
  height: 48px;
  background-color: white;
  flex-direction: column;
  justify-content: center;
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const TitleText = styled(Text.M)`
  margin-left: 16px;
`;

const StackBackHeader = ({ title, onPress }) => (
  <Container>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Horizontal>
        <Icon name="arrow-back" size={24} color={Colors.black} />
        <TitleText bold>{title}</TitleText>
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
