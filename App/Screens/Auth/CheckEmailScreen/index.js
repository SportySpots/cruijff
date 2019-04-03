import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';

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
// COMPONENT:
//------------------------------------------------------------------------------
class CheckEmailScreen extends React.PureComponent {
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
          <Text size="L" center>
            {I18n.t(`checkEmailScreen.${action}.title`)}
          </Text>
          <Spacer size="XL" />
          <Text size="M" center style={{ maxWidth: 300 }}>
            {I18n.t(`checkEmailScreen.${action}.subtitle`)}
          </Text>
        </View>
      </Container>
    );
  }
}

CheckEmailScreen.propTypes = {
  action: PropTypes.oneOf(['login', 'signup']).isRequired,
};

export default CheckEmailScreen;
