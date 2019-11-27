import React, { useContext } from 'react';
import I18n from '../../../I18n';
import { TopLayout, BottomLayout } from 'App/Components/Layouts/FixedBottomLayout';
import Block from 'App/Components/Common/Block';
import Row from 'App/Components/Common/Row';
import Divider from 'App/Components/Common/Divider';
import Spacer from 'App/Components/Common/Spacer';
import Text from 'App/Components/Common/Text';
import SliderWithText from 'App/Components/Common/SliderWithText';
import SwitchWithText from 'App/Components/Common/SwitchWithText';
import RaisedButton from 'App/Components/Common/RaisedButton';
import filters, { SpotFiltersStore } from 'App/Stores/SpotFilters';
import { copyProperties } from "App/Stores/utils";
import { observer, useLocalStore } from "mobx-react";
import { View } from 'react-native';
import GET_SPORTS from "App/GraphQL/Sports/Queries/GET_SPORTS";
import { useQuery } from "@apollo/react-hooks";
import { NavigationContext } from "react-navigation";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterScreen = () => {
  const localFilters = useLocalStore(() => new SpotFiltersStore());
  const sportsQuery = useQuery<{sports: any[]}>(GET_SPORTS);
  const navigation = useContext(NavigationContext);
  React.useEffect(() => {
    copyProperties(filters, localFilters);
  }, []);
  const handleSubmit = () => {
    copyProperties(localFilters, filters);
    navigation.goBack();
  }
  if (sportsQuery.loading) {
    return null;
  }

  if (!sportsQuery.data) {
    return null;
  }

  const sports = sportsQuery.data.sports;

  return (
    <View style={{flex: 1}}>
      <TopLayout key="top">
        <Block>
          <SliderWithText
            minimumValue={0}
            maximumValue={20}
            value={filters.maxDistance}
            onValueChange={value => localFilters.maxDistance = value}
            label={I18n.t('spotsFilterScreen.slider.label')}
            description={(
              <Row alignItems="flex-end">
                <Text size="SM" color="gray">
                  {I18n.t('spotsFilterScreen.slider.description')}
                </Text>
                <Spacer row size="S" />
                <Text size="SM" semibold>
                  {`${localFilters.maxDistance.toFixed(1).toString().replace('.0', '')} KM`}
                </Text>
              </Row>
            )}
          />
        </Block>
        <Divider />
        <Block>
          <SwitchWithText
            label={I18n.t('spotsFilterScreen.switch.allSports.label')}
            description={I18n.t('spotsFilterScreen.switch.allSports.description')}
            value={localFilters.allSports}
            onChange={() => {
              localFilters.allSports = !localFilters.allSports
              localFilters.selectedSportIds = localFilters.allSports
                ? sports.map(s => s.id)
                : [];
            }}
          />
        </Block>
        <Divider />
        <Block>
          {sportsQuery.data.sports.map((sport, index) => [
            <SwitchWithText
              key={sport.id}
              label={I18n.t(sport.name)}
              value={localFilters.selectedSportIds.includes(sport.id)}
              onChange={() => {
                if (localFilters.selectedSportIds.includes(sport.id)) {
                  localFilters.selectedSportIds = localFilters.selectedSportIds.filter(id => id !== sport.id);
                } else {
                  localFilters.selectedSportIds = [...localFilters.selectedSportIds, sport.id]
                }
              }}
            />,
            // Add spacer after every switch except for the last item
            index < sports.length - 1 && (
              <Spacer
                key={`spacer-${sport.id}`}
                size="XL"
              />
            ),
          ])}
        </Block>
      </TopLayout>
      <BottomLayout key="bottom">
        <RaisedButton
          variant="default"
          label={I18n.t('spotsFilterScreen.btnLabel')}
          disabled={false}
          onPress={handleSubmit}
        />
      </BottomLayout>
    </View>
  )
}

export default observer(SpotsFilterScreen);
