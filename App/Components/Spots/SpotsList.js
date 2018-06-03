import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../GraphQL/Spots/Fragments/spot';
import NothingFound from '../NothingFound';
import I18n from '../../I18n';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const CardContainer = styled(TouchableOpacity)`
  margin: 8px;
  border-radius: 8px;
  /* shadow-offset: { width: 0, height: 2 }; */
  shadow-radius: 2px;
  shadow-color: black;
  shadow-opacity: 0.3;
  elevation: 2;
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
  style: PropTypes.object,
};

SpotsList.defaultProps = {
  spots: [],
  onCardPress: () => {},
  style: {},
};

export default SpotsList;
