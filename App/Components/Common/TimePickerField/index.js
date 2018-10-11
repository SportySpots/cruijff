import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePickerModal from 'react-native-modal-datetime-picker';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import BoxField from '../BoxField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TimePickerField = ({
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
          value={value ? moment(value).format('HH:mm') : I18n.t('Select')}
          onPress={openModal}
          {...rest}
        />
      ) : (
        <BoxField
          key="box-field"
          label={label}
          value={value ? moment(value).format('HH:mm') : I18n.t('Select')}
          onPress={openModal}
          {...rest}
        />
      ),
      <TimePickerModal
        key="modal"
        mode="time"
        isVisible={visible}
        date={value}
        onConfirm={(date) => {
          onChange(date);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    ]}
  </ModalProps>
);

TimePickerField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  boxed: PropTypes.bool,
  // Plus all InputField props (theme, size)
};

TimePickerField.defaultProps = {
  label: '',
  value: new Date(),
  onChange: () => {},
  boxed: false,
};

export default TimePickerField;
