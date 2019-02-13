import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';

import { withUser, userPropTypes } from '../../../Context/User';
import RaisedButton from '../../../Components/Common/RaisedButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
  justify-content: center
`;
//------------------------------------------------------------------------------
const Title = styled(Text.L)`
  text-align: center;
`;
//------------------------------------------------------------------------------
const Subtitle = styled(Text.M)`
  text-align: center;
  max-width: 300px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SocialLoginFailedScreen extends React.PureComponent {
  render() {
    return (
      <Container>
        <View>
          <Center>
            <Image
              style={{ height: 121, width: 121 }}
              resizeMode="contain"
              source={Images.avatarError}
            />
          </Center>
          <Spacer size="XL" />
          <Title>{I18n.t('socialLoginFailedScreen.title')}</Title>
          <Spacer size="XL" />
          <Subtitle>{I18n.t('socialLoginFailedScreen.subtitle')}</Subtitle>
          <Spacer size="XL" />
          <RaisedButton label={I18n.t('Register')} />
        </View>
      </Container>
    );
  }
}

SocialLoginFailedScreen.propTypes = {
  ...userPropTypes.isRequired,
};

export default withUser(SocialLoginFailedScreen);
