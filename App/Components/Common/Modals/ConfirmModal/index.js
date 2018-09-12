import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '../../../../Components/Common/RaisedButton';
import ButtonModal from '../ButtonModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ConfirmModal = ({
  okBtnLabel,
  onOk,
  ...rest
}) => {
  const footer = (
    <RaisedButton
      label={okBtnLabel}
      size="S"
      status="primary"
      onPress={onOk}
    />
  );

  return <ButtonModal {...rest} footer={footer} />;
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
