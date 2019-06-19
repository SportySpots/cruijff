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
        key="input-field"
        comp="TextField"
        value={value ? value.toString() : ''}
        focusable={false}
        onPress={openModal}
        {...rest}
      />,
      // Force re-render to re-initialize CapacityPickerModal state
      visible && (
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
        />
      ),
    ]}
  </ModalProps>
);

CapacityPickerField.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

CapacityPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default CapacityPickerField;
