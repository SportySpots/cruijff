import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import Field from '../InputField';
import DatePickerModal from '../Modals/DatePickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DatePickerField = ({ value, onChange }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <Field
        key="field"
        value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
        onPress={openModal}
      />,
      <DatePickerModal
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

DatePickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DatePickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DatePickerField;
