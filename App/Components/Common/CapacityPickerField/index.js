import React from 'react';
import PropTypes from 'prop-types';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import BoxField from '../BoxField';
import CapacityPickerModal from '../Modals/CapacityPickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CapacityPickerField = ({
  label,
  value,
  onChange,
  boxed,
  ...rest
}) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      !boxed ? (
        <InputField
          key="input-field"
          value={value ? value.toString() : ''}
          onPress={openModal}
          {...rest}
        />
      ) : (
        <BoxField
          key="box-field"
          label={label}
          value={value ? value.toString() : ''}
          onPress={openModal}
          {...rest}
        />
      ),
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
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  boxed: PropTypes.bool,
  // Plus all InputField props (theme, size)
};

CapacityPickerField.defaultProps = {
  label: '',
  value: null,
  onChange: () => {},
  boxed: false,
};

export default CapacityPickerField;
