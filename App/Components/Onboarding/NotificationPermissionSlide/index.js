import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import styled from 'styled-components';

import I18n from '../../../I18n';
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
// STYLE:
//------------------------------------------------------------------------------
const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class NotificationPermissionSlide extends React.PureComponent {
  onYes = async () => {
    const hasPermission = await firebase.messaging().requestPermission();
  }

  render() {
    const { location, onChange } = this.props;

    return (
      <ImageBackground image={Images.locationOnboarding}>
        <View>
          <Text size="M" color="white" center>
            {I18n.t('notificationPermissionSlide.title')}
          </Text>
        </View>
        <Spacer size="L" />
        <ScrollView>
          <Block>
            <Text color="white">{ I18n.t('notificationPermissionSlide.text') }</Text>
            <ButtonContainer>
              <RaisedButton onPress={this.onYes} variant="primary" label={I18n.t('notificationPermissionSlide.buttonYes')} />
              <RaisedButton variant="secondary" label={I18n.t('notificationPermissionSlide.buttonNo')} />
            </ButtonContainer>
          </Block>
        </ScrollView>
      </ImageBackground>
    );
  }
}

NotificationPermissionSlide.requiredFields = ['hasChosen'];

NotificationPermissionSlide.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    coords: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  onChange: PropTypes.func,
};

NotificationPermissionSlide.defaultProps = {
  location: null,
  onChange: () => {},
};

export default NotificationPermissionSlide;
