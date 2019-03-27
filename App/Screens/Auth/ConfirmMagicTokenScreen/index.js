import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Image } from 'react-native';
import styled from 'styled-components';
import client from '../../../GraphQL/ApolloClient';
import SeedorfAPI from '../../../Services/SeedorfApi';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import { withUser, userPropTypes } from '../../../Context/User';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import Row from '../../../Components/Common/Row';
import Block from '../../../Components/Common/Block';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import RaisedButton from '../../../Components/Common/RaisedButton';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import { decodeJWTToken } from '../../../utils';

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
const ButtonContainer = styled.View`
  align-self: stretch;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ConfirmMagicTokenScreen extends React.PureComponent {
  state = {
    status: 'loading',
  }

  handleExpiredToken = () => {
    this.setState({ status: 'expired' });
  }

  async componentWillMount() {
    const { navigation, user, refetchUser } = this.props;

    if (user) {
      this.setState({ status: 'loggedIn' });
      return;
    }

    const { magicToken = null } = navigation.state.params;
    console.log('handling magic token', magicToken);
    if (!magicToken) {
      this.handleExpiredToken();
      return;
    }

    try {
      const res = await SeedorfAPI.confirmMagicLoginLink(magicToken);
      console.log('CONFIRM MAGIC TOKEN RESPONSE', res);

      if (res && res.problem) {
        this.handleExpiredToken();
        return;
      }

      // Store token into local storage and reset apollo store
      const { token } = res.data;
      await AsyncStorage.setItem('TOKEN', token);
      // OBS: we don't neet set token for ApolloClient or REST here,
      // this is being handled for us on ApolloClient.setContext
      client.resetStore();
      await refetchUser(); // TODO: remove this after GET_ME is implemented
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
  user: userPropTypes.user,
  refetchUser: userPropTypes.refetchUser.isRequired,
};

ConfirmMagicTokenScreen.defaultProps = {
  user: null,
};

export default withUser(ConfirmMagicTokenScreen);
