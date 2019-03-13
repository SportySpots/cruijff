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
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

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
class ConfirmMagicTokenScreen extends React.PureComponent {
  state = {
    status: 'loading',
  }

  handleExpiredToken = () => {
    this.setState({ status: 'expired' });
  }

  async componentWillMount() {
    const { navigation, loginWithToken } = this.props;
    const { magicToken = null } = navigation.state.params;

    console.log('handling magic token', magicToken);
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
    const { status } = this.state;

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
                source={Images.checkEmail}
              />
            </Center>
            <Spacer size="XL" />
            <Title>Token expired!</Title>
            {/* <Title>{I18n.t(`checkEmailScreen.${action}.title`)}</Title>
            <Spacer size="XL" />
            <Subtitle>{I18n.t(`checkEmailScreen.${action}.subtitle`)}</Subtitle> */}
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
  loginWithToken: userPropTypes.loginWithToken.isRequired,
};

export default withUser(ConfirmMagicTokenScreen);
