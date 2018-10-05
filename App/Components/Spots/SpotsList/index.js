import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  spots,
  selectedSpot,
  cardComponent,
  onCardPress,
  ...rest
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1 }} // centers not found component
    data={spots}
    renderItem={({ item: spot }) => (
      <TouchableOpacity
        key={spot.uuid}
        onPress={() => { onCardPress(spot); }}
        activeOpacity={1}
      >
        {React.createElement(cardComponent, {
          spot,
          active: (selectedSpot && selectedSpot.uuid === spot.uuid) || false,
        })}
      </TouchableOpacity>
    )}
    keyExtractor={item => item.uuid}
    ListEmptyComponent={(
      <NothingFound
        icon="map-marker"
        text={I18n.t('No spots found')}
      />
    )}
    ItemSeparatorComponent={() => (
      <Spacer orientation="column" size="M" />
    )}
    {...rest}
  />
);

SpotsList.propTypes = {
  spots: PropTypes.arrayOf(propType(spotFragment)),
  selectedSpot: propType(spotFragment),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
};

SpotsList.defaultProps = {
  spots: [],
  selectedSpot: null,
  onCardPress: () => {},
};

export default SpotsList;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import NothingFound from '../../Common/NothingFound';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const CardContainer = styled(TouchableOpacity)`
  margin-vertical: 4px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  spots,
  cardComponent,
  onCardPress,
  style,
  ...rest
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1 }}
    data={spots}
    ListEmptyComponent={<NothingFound icon="map-marker" text={I18n.t('No spots found')} />}
    renderItem={({ item: spot }) => (
      <CardContainer
        key={spot.uuid}
        onPress={() => { onCardPress(spot.uuid); }}
        activeOpacity={1}
      >
        {React.createElement(cardComponent, { spot })}
      </CardContainer>
    )}
    keyExtractor={item => item.uuid}
    {...rest}
  />
);

SpotsList.propTypes = {
  spots: PropTypes.arrayOf(propType(spotFragment)),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line
};

SpotsList.defaultProps = {
  spots: [],
  onCardPress: () => {},
  style: {},
};

export default SpotsList;

*/
