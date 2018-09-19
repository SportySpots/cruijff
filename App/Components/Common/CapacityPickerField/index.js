import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
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
        value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
        onPress={openModal}
        {...rest}
      />,
      <CapacityPickerModal
        key="modal"
        value={value}
        visible={visible}
        onSelect={(date) => {
          // Pass event up to parent component
          onChange(date);
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
