import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Modal as NativeModal } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../../Themes/Colors';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { height: deviceHeight } = Dimensions.get('window');
const MARGIN = 48;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Overlay = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  margin: ${MARGIN}px;
  border-radius: 4px;
  background-color: ${Colors.white};
  max-height: ${deviceHeight - (2 * MARGIN)}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: introduce header, body and footer components for consistency
const Modal = ({
  children,
  closable,
  onClose,
  ...rest
}) => (
  <NativeModal
    animationType="fade"
    transparent
    onRequestClose={onClose}
    {...rest}
  >
    <Overlay onPress={closable && onClose}>
      <Container>
        {children}
      </Container>
    </Overlay>
  </NativeModal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  // Plus all props from native modal
};

Modal.defaultProps = {
  closable: true,
  onClose: () => {},
};

export default Modal;
