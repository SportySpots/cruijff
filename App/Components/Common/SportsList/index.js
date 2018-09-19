import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../CenteredActivityIndicator';
import Spacer from '../Spacer';
import SportCard from '../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsList = ({ onSportPress }) => (
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
              onPress={onSportPress}
            />
          )}
          data={data.sports}
          ItemSeparatorComponent={() => (
            <Spacer orientation="column" size="L" />
          )}
        />
      );
    }}
  </Query>
);

SportsList.propTypes = {
  onSportPress: PropTypes.func,
};

SportsList.defaultProps = {
  onSportPress: () => {},
};

export default SportsList;
