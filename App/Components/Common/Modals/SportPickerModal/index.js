import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../../I18n';
import sportFragment from '../../../../GraphQL/Sports/Fragments/sport';
import Text from '../../Text';
import SportsList from '../../SportsList';
import DialogModal from '../DialogModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerModal = ({
  value,
  visible,
  onSelect,
  onClose,
}) => {
  const header = (
    <Text.ML>{I18n.t('Choose sport')}</Text.ML>
  );

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      header={header}
    >
      <SportsList
        selectedSport={value}
        onSportPress={onSelect}
      />
    </DialogModal>
  );
};

SportPickerModal.propTypes = {
  value: propType(sportFragment),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SportPickerModal.defaultProps = {
  value: null,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SportPickerModal;
