import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import DatePickerModal from '../Modals/DatePickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DatePickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="field"
        value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
        onPress={openModal}
        {...rest}
      />,
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
  value: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    dateString: PropTypes.string,
  }),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

DatePickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DatePickerField;
