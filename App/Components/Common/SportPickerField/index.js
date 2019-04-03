import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
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
        key="input-field"
        comp="TextField"
        value={(value && (I18n.t(value.name) || I18n.t(value.category))) || I18n.t('sportPickerField.defaultValue')}
        onPress={openModal}
        {...rest}
      />,
      <SportPickerModal
        key="modal"
        value={value}
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
  value: propType(sportFragment),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

SportPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default SportPickerField;
