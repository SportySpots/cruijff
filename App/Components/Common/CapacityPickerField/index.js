import React from 'react';
import PropTypes from 'prop-types';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import CapacityPickerModal from '../Modals/CapacityPickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CapacityPickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="field"
        value={value || ''}
        onPress={openModal}
        {...rest}
      />,
      <CapacityPickerModal
        key="modal"
        value={value}
        visible={visible}
        onSelect={(capacity) => {
          // Pass event up to parent component
          onChange(capacity);
          closeModal();
        }}
        onClose={closeModal}
      />,
    ]}
  </ModalProps>
);

CapacityPickerField.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

CapacityPickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default CapacityPickerField;
