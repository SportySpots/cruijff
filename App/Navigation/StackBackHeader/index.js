import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Row from '../../Components/Common/Row';
import Spacer from '../../Components/Common/Spacer';
import Icon from '../../Components/Common/Icon';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 48px;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const StackBackHeader = ({ onPress }) => (
  <Container>
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Row alignItems="center">
        <Spacer row size="M" />
        <Icon
          iconSet="MaterialIcons"
          iconName="arrow-back"
          size={24}
          color="black"
        />
      </Row>
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
