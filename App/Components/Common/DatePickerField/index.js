import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import DatePickerModal from '../Modals/DatePickerModal';
import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DatePickerField = ({
  value,
  onChange,
  dateFormat,
  ...rest
}) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="input-field"
        comp="TextField"
        value={value ? moment(value).format(dateFormat) : I18n.t('Select')}
        onPress={openModal}
        {...rest}
      />,
      // Force re-render to re-initialize DatePickerModal state
      visible && (
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
        />
      ),
    ]}
  </ModalProps>
);

DatePickerField.propTypes = {
  label: PropTypes.string,
  value: datePickerDatePropTypes,
  onChange: PropTypes.func,
  boxed: PropTypes.bool,
  dateFormat: PropTypes.string,
  // Plus all InputField props (theme, size)
};

DatePickerField.defaultProps = {
  label: '',
  value: null,
  onChange: () => {},
  boxed: false,
  dateFormat: 'DD-MM', // 'DD/MM/YYYY'
};

export default DatePickerField;
