import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { compose } from 'react-apollo';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedTopLayout';
import SpotsList from '../../../Components/Spots/SpotsList';
import SpotsFilterFlap from '../../../Components/Spots/SpotsFilterFlap';
import { IProps as LocationProps, withLocation } from '../../../Context/Location';
import WebViewMap from '../../../Components/Spots/WebViewMap';
import {observer} from "mobx-react";
import { NavigationInjectedProps } from "react-navigation";
import filters from 'App/Stores/SpotFilters';
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
const Bottom = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Container with Layout comp
// TODO: probably move maxDistance to SpotsList and get said value from context
@observer
class SpotsListScreen extends React.Component<NavigationInjectedProps & LocationProps> {
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
      locationEnabled, locationMapCoords,
    } = this.props;
    const mode = this.props.navigation.getParam('mode');
    return (
      <FlexOne testID="SpotsListScreen">
        {(!filters.allSports || filters.maxDistance < 20) && (
          <TopLayout>
            <SpotsFilterFlap
              maxDistance={filters.maxDistance}
              allSports={filters.allSports}
              selectedSportIds={filters.selectedSportIds}
              // onClose={closeFlap}
            />
          </TopLayout>
        )}
        <Bottom>
          <Inner>
            { mode === 'map'
              ? <WebViewMap />
              : (
                <SpotsList
                  cardComponent="SpotListCard"
                  sportsIds={filters.allSports ? [] : filters.selectedSportIds} // empty array will return all spots
                  maxDistance={filters.maxDistance} // km
                  coords={locationMapCoords}
                  onCardPress={this.handleCardPress}
                  selectedSpot={undefined}
                  // FlatList props
                  // onScroll={this.handleScroll}
                />
              )
            }

          </Inner>
        </Bottom>
      </FlexOne>
    );
  }
}

export default withLocation(SpotsListScreen);
