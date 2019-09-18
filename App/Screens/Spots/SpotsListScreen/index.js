import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { compose } from 'react-apollo';
import { spotFiltersPropTypes, withSpotFilters } from '../../../Context/SpotFilters';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedTopLayout';
import SpotsList from '../../../Components/Spots/SpotsList';
import SpotsFilterFlap from '../../../Components/Spots/SpotsFilterFlap';
import { locationPropTypes, withLocation } from '../../../Context/Location';
import WebViewMap from '../../../Components/Spots/WebViewMap';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  padding: 0 8px;
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Container with Layout comp
// TODO: probably move maxDistance to SpotsList and get said value from context
class SpotsListScreen extends React.Component {
  handleCardPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spot.uuid });
  }

  componentWillMount() {
    const { locationUpdate } = this.props;
    locationUpdate();
  }

  render() {
    const {
      maxDistance, allSports, selectedSportIds, locationEnabled, locationCoords,
    } = this.props;
    const mode = this.props.navigation.getParam('mode');
    return (
      <FlexOne testID="SpotsListScreen">
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
          }}
        >
          <Inner>
            { mode === 'map'
              ? <WebViewMap />
              : (
                <SpotsList
                  cardComponent="SpotListCard"
                  sportsIds={allSports ? [] : selectedSportIds} // empty array will return all spots
                  maxDistance={maxDistance} // km
                  coords={locationCoords}
                  onCardPress={this.handleCardPress}
                  // FlatList props
                  // onScroll={this.handleScroll}
                />
              )
            }

          </Inner>
        </BottomLayout>
      </FlexOne>
    );
  }
}

SpotsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  ...locationPropTypes,
  ...spotFiltersPropTypes,
};


const enhance = compose(
  withSpotFilters,
  withLocation,
);

export default enhance(SpotsListScreen);
