import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import SeedorfAPI from '../../../Services/SeedorfApi';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import { withUser, userPropTypes } from '../../../Context/User';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import Row from '../../../Components/Common/Row';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
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
const Title = styled(Text.L)`
  text-align: center;
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
    const { navigation, user, loginWithToken } = this.props;

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

      const loginWentOkay = !!(await loginWithToken(res.data.token));
      console.log('loginWentOkay?', loginWentOkay);
      if (!loginWentOkay) {
        this.handleExpiredToken();
      }
    } catch (exc) {
      console.log(exc);
      this.handleExpiredToken();
    }
  }

  render() {
    const { navigation } = this.props;
    const { status } = this.state;
    const claims = decodeJWTToken(navigation.state.params.magicToken);
    console.log(claims);
    // const { email = '' } = claims;

    if (status === 'loading') {
      return <CenteredActivityIndicator />;
    }

    if (status === 'expired') {
      return (
        <Container>
          <View>
            <Center>
              <Image
                style={{ height: 121, width: 121 }}
                resizeMode="contain"
                source={Images.linkExpired}
              />
            </Center>
            <Spacer size="XL" />
            <Title>{I18n.t('confirmMagicTokenScreen.title')}</Title>
            <Spacer size="XL" />
            <Row justifyContent="center">
              <LinkNavigate
                navigation={navigation}
                to="LoginScreen"
                // params={{ email }}
                params={{ email: 'some@email.com' }}
                text={I18n.t('confirmMagicTokenScreen.link')}
                underline
              />
            </Row>
          </View>
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
  loginWithToken: userPropTypes.loginWithToken.isRequired,
};

ConfirmMagicTokenScreen.defaultProps = {
  user: null,
};

export default withUser(ConfirmMagicTokenScreen);
