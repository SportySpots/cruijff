import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import SportPickerModal from '../Modals/SportPickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="field"
        value={value || I18n.t('Select')}
        onPress={openModal}
        {...rest}
      />,
      <SportPickerModal
        key="modal"
        visible={visible}
        onSelect={(sport) => {
          // Pass event up to parent component
          onChange(sport);
          closeModal();
        }}
        onClose={closeModal}
      />,
    ]}
  </ModalProps>
);

SportPickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

SportPickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default SportPickerField;

