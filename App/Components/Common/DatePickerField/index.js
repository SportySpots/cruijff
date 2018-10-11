import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import BoxField from '../BoxField';
import DatePickerModal from '../Modals/DatePickerModal';
import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DatePickerField = ({
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
          value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
          onPress={openModal}
          {...rest}
        />
      ) : (
        <BoxField
          key="box-field"
          label={label}
          value={value ? moment(value).format('DD/MM/YYYY') : I18n.t('Select')}
          onPress={openModal}
          {...rest}
        />
      ),
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
  // Plus all InputField props (theme, size)
};

DatePickerField.defaultProps = {
  label: '',
  value: null,
  onChange: () => {},
  boxed: false,
};

export default DatePickerField;
