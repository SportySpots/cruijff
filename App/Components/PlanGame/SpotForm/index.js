import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS_FOR_SPORT from '../../../GraphQL/Spots/Queries/GET_SPOTS_FOR_SPORT';
import Spacer from '../../Common/Spacer';
import CenteredActivityIndicator from '../../Common/CenteredActivityIndicator';
import SpotListCardSmall from '../../Spots/SpotListCardSmall';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: implement pagination
const SpotForm = ({ sport, spot, onChange }) => {
  // console.log('SPOT_FORM---------', { sport, spot });

  const sportName = (
    sport && (
      (sport.category && sport.category.toUpperCase()) ||
      (sport.name && sport.name.toUpperCase())
    )
  ) || 'SOCCER';

  // console.log('SPOT_FORM SPORT NAME', sportName);

  return (
    <Query
      query={GET_SPOTS_FOR_SPORT}
      variables={{
        limit: 50,
        offset: 0,
        sport: sportName,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) { return <CenteredActivityIndicator />; }
        if (error || !data) { return null; }

        // console.log('SPOT_FORM DATA---------', data);

        return [
          <Spacer key="spacer" size="XL" />,
          <SpotsList
            key="spots"
            spots={data.spots || []}
            selectedSpot={spot}
            cardComponent={SpotListCardSmall}
            onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
          />,
        ];
      }}
    </Query>
  );
};

SpotForm.propTypes = {
  sport: propType(sportFragment),
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotForm.defaultProps = {
  sport: null,
  spot: null,
  onChange: () => {},
};

export default SpotForm;
