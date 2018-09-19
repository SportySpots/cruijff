import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../CenteredActivityIndicator';
import SportCard from '../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsList = ({ selectedSport, onSportPress }) => (
  <Query query={GET_SPORTS}>
    {({ loading, error, data }) => {
      if (loading) { return <CenteredActivityIndicator />; }
      if (error || !data) { return null; }

      return (
        <FlatList
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => (
            <SportCard
              sport={item}
              isSelected={(
                selectedSport &&
                selectedSport.uuid &&
                item.uuid === selectedSport.uuid
              )}
              onPress={onSportPress}
            />
          )}
          data={data.sports}
          ItemSeparatorComponent={null}
        />
      );
    }}
  </Query>
);

SportsList.propTypes = {
  selectedSport: propType(sportFragment),
  onSportPress: PropTypes.func,
};

SportsList.defaultProps = {
  selectedSport: null,
  onSportPress: () => {},
};

export default SportsList;
