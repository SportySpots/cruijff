import React from 'react';
import styled from 'styled-components/native';
import { TopLayout } from '../../../Components/Layouts/FixedTopLayout';
import SpotsList from '../../../Components/Spots/SpotsList';
import SpotsFilterFlap from '../../../Components/Spots/SpotsFilterFlap';
import WebViewMap from '../../../Components/Spots/WebViewMap';
import {observer} from "mobx-react";
import { NavigationInjectedProps } from "react-navigation";
import filters from 'App/Stores/SpotFilters';
import locationStore from 'App/Stores/Location';
import { TouchableWithoutFeedback, View } from "react-native";

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
class SpotsListScreen extends React.Component<NavigationInjectedProps> {
  handleCardPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { uuid: spot.uuid });
  }

  componentWillMount() {
    locationStore.updateLocation();
  }

  render() {
    const mode = this.props.navigation.getParam('mode');
    return (
      <FlexOne testID="SpotsListScreen">
        {(!filters.allSports || filters.maxDistance < 20) && (
          <TopLayout>
            <TouchableWithoutFeedback
              onPress={() => { console.log('click'); this.props.navigation.navigate('SpotsFilterScreen'); }}>
              <View>
                <SpotsFilterFlap
                maxDistance={filters.maxDistance}
                allSports={filters.allSports}
                selectedSportIds={filters.selectedSportIds}
                // onClose={closeFlap}
              />
              </View>
            </TouchableWithoutFeedback>
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
                  coords={locationStore.locationMapCoords}
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

export default SpotsListScreen;
