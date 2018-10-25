import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '../../RaisedButton';
import Row from '../../Row';
import DialogModal from '../DialogModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ConfirmModal = ({ okBtnLabel, onOk, ...rest }) => {
  const footer = (
    <Row
      justifyContent="flex-end"
      alignItems="center"
    >
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
