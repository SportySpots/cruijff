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
// COMPONENT:
//------------------------------------------------------------------------------
class CityPicker extends React.PureComponent {
  state = {
    location: null,
  }

  completed() {
    return !!this.state.location;
  }

  render() {
    const { locationSetCity, onChange } = this.props;
    const { location } = this.state;

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
                    this.setState({ location: item.id }, onChange);
                    locationSetCity(item.id);
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

CityPicker.requiredFields = ['location'];

CityPicker.propTypes = {
  locationSetCity: locationPropTypes.locationSetCity,
  onChange: PropTypes.func,
};

CityPicker.defaultProps = {
  locationSetCity: () => null,
  onChange: () => null,
};

export default withLocation(CityPicker);
