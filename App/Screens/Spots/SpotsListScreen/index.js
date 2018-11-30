import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import styled from 'styled-components';
import SpotsList from '../../../Components/Spots/SpotsList';
import { locationPropTypes, withLocation } from '../../../Context/Location';
import { spotFiltersPropTypes, withSpotFilters } from '../../../Context/SpotFilters';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedTopLayout';
import SpotsFilterFlap from '../../../Components/Spots/SpotsFilterFlap';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  padding: 0 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Container with Layout comp
class SpotsListScreen extends React.Component {
  /* state = {
    displayFlap: true,
  }

  handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    this.setState({ displayFlap: offset <= 40 });
  } */

  handleCardPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spot.uuid });
  }

  render() {
    const {
      maxDistance,
      allSports,
      selectedSportIds,
      // flapIsOpen,
      // closeFlap,
      location,
    } = this.props;
    // const { displayFlap } = this.state;

    return (
      <Outer testID="SpotsListScreen">
        {(!allSports || maxDistance < 20) && (
          <TopLayout>
            <SpotsFilterFlap
              maxDistance={maxDistance}
              allSports={allSports}
              selectedSportIds={selectedSportIds}
              // onClose={closeFlap}
            />
          </TopLayout>
        )}
        <BottomLayout
          contentContainerStyle={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Inner>
            <SpotsList
              cardComponent="SpotListCard"
              sportsIds={allSports ? [] : selectedSportIds} // empty array will return all spots
              userCoords={location}
              maxDistance={maxDistance} // km
              onCardPress={this.handleCardPress}
              // FlatList props
              onScroll={this.handleScroll}
            />
          </Inner>
        </BottomLayout>
      </Outer>
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
