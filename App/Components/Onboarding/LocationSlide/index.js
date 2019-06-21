import PropTypes from 'prop-types';
import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import I18n from '../../../I18n';
import { CITIES, withLocation, locationPropTypes } from '../../../Context/Location';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  location: null,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LocationSlide extends React.PureComponent {
  render() {
    const { location, onChange, locationSetCity } = this.props;

    return (
      <ImageBackground image={Images.locationOnboarding}>
        <View>
          <Text size="M" color="white" center>
            {I18n.t('locationSlide.title')}
          </Text>
        </View>
        <Spacer size="L" />
        <ScrollView>
          <Block style={{ flex: 1 }}>
            <FlatList
              keyExtractor={item => item.id}
              data={CITIES}
              renderItem={({ item }) => (
                <RaisedButton
                  label={item.city}
                  variant={location === item.id ? 'default' : 'transparent'}
                  onPress={() => {
                    locationSetCity(item.id);
                    onChange({ fieldName: 'location', value: item.id });
                  }}
                />
              )}
              ItemSeparatorComponent={() => (<Spacer size="XL" />)}
              contentContainerStyle={{ flex: 1 }}
            />
          </Block>
        </ScrollView>
      </ImageBackground>
    );
  }
}

LocationSlide.requiredFields = ['location'];

LocationSlide.propTypes = {
  location: PropTypes.string,
  locationSetCity: locationPropTypes.locationSetCity,
  onChange: PropTypes.func,
};

LocationSlide.defaultProps = {
  location: null,
  locationSetCity: () => null,
  onChange: () => {},
};

export default withLocation(LocationSlide);
