import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { ScrollView } from 'react-native';
import I18n from '../../../../I18n';
import sportFragment from '../../../../GraphQL/Sports/Fragments/sport';
import Text from '../../Text';
import SportsList from '../../SportsList';
import DialogModal from '../DialogModal';
import { SPORT_CARD_HEIGHT } from '../../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerModal = ({
  value,
  visible,
  onSelect,
  onClose,
}) => {
  const header = <Text.ML>{I18n.t('sportPickerModal.header')}</Text.ML>;

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      header={header}
      bodyHeight={7 * SPORT_CARD_HEIGHT}
    >
      <ScrollView>
        <SportsList
          selectedSport={value}
          onSportPress={onSelect}
        />
      </ScrollView>
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
