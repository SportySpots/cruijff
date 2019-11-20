import React from 'react';
import I18n from '../../../I18n';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import SliderWithText from '../../Common/SliderWithText';
import SwitchWithText from '../../Common/SwitchWithText';
import RaisedButton from '../../Common/RaisedButton';
import filters, { SpotFiltersStore } from 'App/Stores/SpotFilters';
import { copyProperties } from "App/Stores/utils";
import { observer, useLocalStore } from "mobx-react";
import { View } from 'react-native';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
interface IProps {
  sports: any;
  disabled: boolean;
}

const SpotsFilterForm = ({sports, disabled}: IProps) => {
  const localFilters = useLocalStore(() => new SpotFiltersStore());
  React.useEffect(() => {
    console.log('asd', filters.maxDistance);
    copyProperties(filters, localFilters);
  });
  const handleSubmit = () => copyProperties(localFilters, filters);

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
            onChange={() => localFilters.allSports = true}
          />
        </Block>
        <Divider />
        <Block>
          {sports.map((sport, index) => [
            <SwitchWithText
              key={sport.id}
              label={I18n.t(sport.name)}
              value={localFilters.selectedSportIds.includes(sport.id)}
              onChange={() => {
                if (localFilters.selectedSportIds.includes(sport.id)) {
                  localFilters.selectedSportIds.remove(sport.id)
                } else {
                  localFilters.selectedSportIds.push(sport.id)
                  console.log(localFilters.selectedSportIds);
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
          disabled={disabled}
          onPress={handleSubmit}
        />
      </BottomLayout>
    </View>
  )
}

export default observer(SpotsFilterForm);
