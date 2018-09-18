import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from '../../../../Components/Common/Divider';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Body = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
`;
//------------------------------------------------------------------------------
const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DialogModal = ({ children, footer, ...rest }) => (
  <Modal {...rest}>
    <Body>
      {children}
    </Body>
    <Divider />
    <Footer>
      {footer}
    </Footer>
  </Modal>
);

DialogModal.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  // Plus all props from native modal and Modal
};

DialogModal.defaultProps = {
  footer: () => null,
};

export default DialogModal;
