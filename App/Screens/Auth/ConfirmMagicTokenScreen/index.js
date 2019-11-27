import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import firebase from 'react-native-firebase';
import client from '../../../GraphQL/ApolloClient';
import SeedorfAPI from '../../../Services/SeedorfApi';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import Row from '../../../Components/Common/Row';
import Block from '../../../Components/Common/Block';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import RaisedButton from '../../../Components/Common/RaisedButton';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import { decodeJWTToken } from '../../../utils';
import {observer} from "mobx-react";
import userStore from 'App/Stores/User';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
  justify-content: center
`;
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  align-self: stretch;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class ConfirmMagicTokenScreen extends React.PureComponent {
  state = {
    status: 'loading',
  }

  handleExpiredToken = () => {
    this.setState({ status: 'expired' });
  }

  async componentWillMount() {
    const { navigation } = this.props;

    if (userStore.user) {
      this.setState({ status: 'loggedIn' });
      return;
    }

    const { magicToken = null } = navigation.state.params;

    if (!magicToken) {
      this.handleExpiredToken();
      return;
    }

    try {
      const res = await SeedorfAPI.confirmMagicLoginLink(magicToken);

      if (res && res.problem) {
        this.handleExpiredToken();
        console.log(res);
        return;
      }

      // Store token into local storage and reset apollo store
      const { token } = res.data;
      await AsyncStorage.setItem('TOKEN', token);
      // OBS: we don't neet set token for ApolloClient or REST here,
      // this is being handled for us on ApolloClient.setContext
      client.resetStore();

      await userStore.fetchUser()

      // save the FCM token
      const claims = decodeJWTToken(token);
      SeedorfAPI.saveFCMToken({
        userUUID: claims.uuid,
        fcmToken: await firebase.messaging().getToken(),
      });
    } catch (exc) {
      console.log(exc);
      this.handleExpiredToken();
    }
  }

  render() {
    const { navigation } = this.props;
    const { status } = this.state;
    const claims = decodeJWTToken(navigation.state.params.magicToken);

    if (status === 'loading') {
      return <CenteredActivityIndicator />;
    }

    if (status === 'expired') {
      return (
        <Container>
          <Block>
            <Center>
              <Image
                style={{ height: 121, width: 121 }}
                resizeMode="contain"
                source={Images.linkExpired}
              />
            </Center>
            <Spacer size="XL" />
            <Text size="L" center>
              {I18n.t('confirmMagicTokenScreen.title')}
            </Text>
            <Spacer size="XXL" />
            <ButtonContainer>
              <RaisedButton
                label={I18n.t('confirmMagicTokenScreen.btnLabel')}
                variant="primary"
                onPress={() => { navigation.navigate('LoginScreen', { email: (claims && claims.email) || '' }); }}
              />
            </ButtonContainer>
            <Spacer size="XXL" />
            <Row justifyContent="center">
              <LinkNavigate
                navigation={navigation}
                to="SplashScreen"
                text={I18n.t('confirmMagicTokenScreen.link')}
                underline
              />
            </Row>
          </Block>
        </Container>
      );
    }

    return null;
  }
}

ConfirmMagicTokenScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        magicToken: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ConfirmMagicTokenScreen;
