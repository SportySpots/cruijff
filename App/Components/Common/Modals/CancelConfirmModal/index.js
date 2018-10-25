import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '../../RaisedButton';
import Row from '../../Row';
import Spacer from '../../Spacer';
import DialogModal from '../DialogModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelConfirmModal = ({
  okBtnLabel,
  cancelBtnLabel,
  onOk,
  onCancel,
  ...rest
}) => {
  const footer = (
    <Row
      justifyContent="flex-end"
      alignItems="center"
    >
      <RaisedButton
        label={cancelBtnLabel}
        size="S"
        variant="secondary"
        onPress={onCancel}
      />
      <Spacer row size="M" />
      <RaisedButton
        label={okBtnLabel}
        size="S"
        variant="primary"
        onPress={onOk}
      />
    </Row>
  );

  return <DialogModal {...rest} footer={footer} />;
};

CancelConfirmModal.propTypes = {
  children: PropTypes.node.isRequired,
  cancelBtnLabel: PropTypes.string,
  okBtnLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  // Plus all props from native modal and Modal
};

CancelConfirmModal.defaultProps = {
  okBtnLabel: '',
  cancelBtnLabel: '',
  onOk: () => {},
  onCancel: () => {},
};

export default CancelConfirmModal;
