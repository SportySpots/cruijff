import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import Images from '../Themes/Images';
import I18n from '../I18n/index';
import locationActions from '../Redux/LocationRedux';
import Colors from '../Themes/Colors';
import Fonts from '../Themes/Fonts';
import Text from '../Components/Common/Text';
import PropTypesDefinitions from '../PropTypesDefinitions';

export default connect(null, { updateLocation: locationActions.updateLocation })(class AskLocation extends React.PureComponent {
  static propTypes = {
    navigation: PropTypesDefinitions.navigation.isRequired,
    updateLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { checked: false }; // has location permission been checked?
  }

  async ask() {
    await Permissions.request('location'); // one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    this.props.updateLocation();
    this.props.navigation.navigate('MainNav');
  }

  componentWillMount() {
    Permissions.check('location').then((response) => {
      if (response === 'denied' || response === 'undetermined') {
        this.setState({ checked: true });
      } else {
        this.props.navigation.navigate('MainNav');
      }
    }).catch(() => {
      this.props.navigation.navigate('MainNav');
    });
  }

  render() {
    if (!this.state.checked) return null;
    return (
      <Container>
        <Container>
          <ImageContainer>
            <Image
              style={{ flex: 1 }}
              resizeMode="contain"
              source={Images.illustrationShareLocation}
            />
          </ImageContainer>
          <TextContainer>
            <Title>{I18n.t('share-your-location')}</Title>
            <Paragraph>{I18n.t('onboarding-ask-location')}</Paragraph>
          </TextContainer>
        </Container>
        <Footer>
          <View>
            {/* <WhiteText>{I18n.t('share-your-location')}</WhiteText> */}
          </View>
          <HorizontalView>
            <TouchableHighlight onPress={() => this.ask()}>
              <View>
                <ButtonText>
                  {I18n.t('continue').toUpperCase()}
                </ButtonText>
              </View>
            </TouchableHighlight>
          </HorizontalView>
        </Footer>
      </Container>
    );
  }
});

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.darkGreen};
`;

const ImageContainer = styled.View`
  flex: 1;
  padding-right: 50px;
  padding-left: 50px;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Title = styled(Text.L)`
  color: ${Colors.white};
  text-align: center;
  margin-horizontal: 48px;
  margin-bottom: 24px;
`;

const Paragraph = styled(Text.M)`
  line-height: ${Fonts.style.M.fontSize * 1.5};
  color: ${Colors.white};
  text-align: center;
  margin-horizontal: 50px;
`;

const Footer = styled.View`
  height: 50px;
  flex-direction: row;
  background-color: ${Colors.black};
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 8;
`;

const WhiteText = styled(Text.S)`
  color: ${Colors.white};
  font-size: 16px;
`;

const HorizontalView = styled.View`
  flex-direction: row;
`;

const ButtonText = styled(Text.M)`
  color: ${Colors.actionYellow};
  margin-horizontal: 10px;
`;
