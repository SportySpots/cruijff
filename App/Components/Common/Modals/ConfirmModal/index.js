import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Divider from '../../../../Components/Common/Divider';
import RaisedButton from '../../../../Components/Common/RaisedButton';
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
const ConfirmModal = ({
  children,
  okBtnLabel,
  onOk,
  ...rest
}) => (
  <Modal {...rest}>
    <Body>
      {children}
    </Body>
    <Divider />
    <Footer>
      <RaisedButton
        label={okBtnLabel}
        size="S"
        status="primary"
        onPress={onOk}
      />
    </Footer>
  </Modal>
);

ConfirmModal.propTypes = {
  children: PropTypes.node.isRequired,
  okBtnLabel: PropTypes.string,
  onOk: PropTypes.func,
  // Plus all props from native modal and Modal
};

ConfirmModal.defaultProps = {
  okBtnLabel: '',
  onOk: () => {},
};

export default ConfirmModal;
