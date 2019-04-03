import React from 'react';
import PropTypes from 'prop-types';
import { Modal as NativeModal } from 'react-native';
import styled from 'styled-components/native';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Overlay = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.transparent80};
`;
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  margin: 48px auto;
  width: 90%;
  max-width: 320px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
