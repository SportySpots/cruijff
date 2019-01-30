import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import { Events, IncomingLinks } from '../../../Services/IncomingLinks';
import api from '../../../Services/SeedorfApi';

import { withUser, userPropTypes } from '../../../Context/User';

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
class CheckEmailScreen extends React.Component {
  magicTokenHandler = async (magicToken) => {
    const { onSuccessHook, loginWithToken } = this.props;
    const result = await api.confirmMagicLoginLink(magicToken);
    console.log('magic', result);
    const { token } = result.data;
    if (await loginWithToken(token)) {
      onSuccessHook();
    }
  }

  componentWillMount() {
    IncomingLinks.on(Events.MAGIC_LINK_LOGIN, this.magicTokenHandler);
  }

  componentWillUnmount() {
    IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, this.magicTokenHandler);
  }

  render() {
    const { action } = this.props;
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
          <Title>{I18n.t(`checkEmailScreen.${action}.title`)}</Title>
          <Spacer size="XL" />
          <Subtitle>{I18n.t(`checkEmailScreen.${action}.subtitle`)}</Subtitle>
        </View>
      </Container>
    );
  }
}

CheckEmailScreen.propTypes = {
  action: PropTypes.oneOf(['login', 'signup']).isRequired,
  ...userPropTypes.isRequired,
  onSuccessHook: PropTypes.func,
};

CheckEmailScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default withUser(CheckEmailScreen);
