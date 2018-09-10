import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../CenteredActivityIndicator';
import Divider from '../Divider';
import SportCard from '../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsList = ({ onSelect }) => (
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
              onSelect={onSelect}
            />
          )}
          data={data.sports}
          ItemSeparatorComponent={Divider}
        />
      );
    }}
  </Query>
);

SportsList.propTypes = {
  onSelect: PropTypes.func,
};

SportsList.defaultProps = {
  onSelect: () => {},
};

export default SportsList;
