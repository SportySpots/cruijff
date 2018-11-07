import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import SpotsList from '../../../Components/Spots/SpotsList';
import { locationPropTypes, withLocation } from '../../../Context/Location';
import { spotFiltersPropTypes, withSpotFilters } from '../../../Context/SpotFilters';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Container with Layout comp
// TODO: get rid of geolocation call, use user data from query instead
class SpotsListScreen extends React.Component {
  handleCardPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spot.uuid });
  }

  render() {
    const {
      maxDistance, allSports, selectedSportIds, location,
    } = this.props;

    return (
      <Container testID="SpotsListScreen">
        <SpotsList
          cardComponent="SpotListCard"
          sportsIds={allSports ? [] : selectedSportIds} // empty array will return all spots
          userCoords={location}
          maxDistance={maxDistance} // km
          onCardPress={this.handleCardPress}
        />
      </Container>
    );
  }
}

SpotsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  location: locationPropTypes.location.isRequired,
  ...spotFiltersPropTypes,
};

const enhance = compose(
  withLocation,
  withSpotFilters,
);

export default enhance(SpotsListScreen);
