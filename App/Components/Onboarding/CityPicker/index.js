import PropTypes from 'prop-types';
import React from 'react';
import { View, FlatList, ScrollView, AsyncStorage } from 'react-native';
import styled from 'styled-components';

import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';
import { CITIES, withSpotFilters } from '../../../Context/SpotFilters';
import Footer from '../../Common/DarkFooter';

const FlexOne = styled.View`
  flex: 1; /* full height */
`;

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
    const { setCity, onChange } = this.props;
    const { location } = this.state;

    return (
      <FlexOne>
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
                      setCity(item.id);
                    }}
                  />
                )}
                ItemSeparatorComponent={() => (<Spacer size="XL" />)}
                contentContainerStyle={{ flex: 1 }}
              />
            </Block>
          </ScrollView>
        </ImageBackground>
        <Footer
          numPages={1}
          currentPage={0}
          onNext={() => {
            AsyncStorage.setItem('OnboardingCompleted', 'true');
            this.props.navigation.navigate('MainNav');
          }}
          disableNext={!this.completed()}
          buttonNextText={I18n.t('go')}
          showBack={false}
        />
      </FlexOne>
    );
  }
}

CityPicker.requiredFields = ['location'];

CityPicker.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
  onChange: PropTypes.func,
  setCity: PropTypes.func,
};

CityPicker.defaultProps = {
  navigation: {
    goBack: () => null,
    navigate: () => null,
  },
  onChange: () => null,
  setCity: () => null,
};

export default withSpotFilters(CityPicker);
