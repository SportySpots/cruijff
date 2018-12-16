import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../../I18n';
import Colors from '../../../../Themes/Colors';
import spotFragment from '../../../../GraphQL/Spots/Fragments/spot';
import sportFragment from '../../../../GraphQL/Sports/Fragments/sport';
import Text from '../../Text';
import SpotsList from '../../../Spots/SpotsList';
import DialogModal from '../DialogModal';

//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 0 8px;
  background-color: ${Colors.concrete}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotPickerModal = ({
  value,
  sport,
  visible,
  onSelect,
  onClose,
}) => {
  const header = <Text.ML>{I18n.t('spotPickerModal.header')}</Text.ML>;

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      header={header}
    >
      <Container>
        <SpotsList
          cardComponent="SpotListCardSmall"
          sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
          // userCoords={userCoords}
          // maxDistance={maxDistance} // km
          selectedSpot={value}
          onCardPress={onSelect}
        />
      </Container>
    </DialogModal>
  );
};

SpotPickerModal.propTypes = {
  value: propType(spotFragment),
  sport: propType(sportFragment),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SpotPickerModal.defaultProps = {
  value: null,
  sport: null,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SpotPickerModal;
