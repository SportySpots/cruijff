import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import DatePickerModal from '../Modals/DatePickerModal';

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
        value={value ? value.clone().local().format(dateFormat).toTitleCase() : I18n.t('datePickerField.defaultValue')}
        focusable={false}
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
  value: PropTypes.instanceOf(moment),
  onChange: PropTypes.func,
  dateFormat: PropTypes.string,
  // Plus all InputField props (theme, size)
};

DatePickerField.defaultProps = {
  value: null,
  onChange: () => {},
  dateFormat: 'DD-MM', // 'DD/MM/YYYY'
};

export default DatePickerField;
