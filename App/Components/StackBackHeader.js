import React from 'react';
import Colors from '../Themes/Colors';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Text from './Text';

const StackBackHeader = ({ navigation, title, ...props }) =>
  console.log(navigation) || (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Horizontal>
          <Icon name="keyboard-backspace" size={32} color={Colors.primaryGreen} />
          <TitleText>{title}</TitleText>
        </Horizontal>
      </TouchableOpacity>
    </Container>
  );

const Container = styled.View`
  height: 48px;
  padding-left: 8px;
  padding-top: 8px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.primaryGreen};
`;

const Horizontal = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled(Text.M)`
  color: ${Colors.primaryGreen};
`;

export default StackBackHeader;
