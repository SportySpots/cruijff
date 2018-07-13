import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Text from '../../Components/Text';
import Colors from '../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-horizontal: 8px;
`;
//------------------------------------------------------------------------------
const Block = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.white};
  padding-horizontal: 8px;
`;
//------------------------------------------------------------------------------
const Value = styled(Text.M)`
  font-size: 28px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Field = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Container>
      <Block>
        <Value>{value}</Value>
      </Block>
      <Icon size={24} name="keyboard-arrow-down" />
    </Container>
  </TouchableOpacity>
);

Field.propTypes = {
  value: PropTypes.string,
  onPress: PropTypes.func,
};

Field.defaultProps = {
  value: '',
  onPress: () => {},
};

export default Field;
