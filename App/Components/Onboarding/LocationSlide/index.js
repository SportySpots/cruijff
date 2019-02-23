import PropTypes from 'prop-types';
import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';
import { CITIES } from '../../../Context/Location';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Title = styled(Text.M)`
  color: ${Colors.white};
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LocationSlide = ({ location, onChange }) => (
  <ImageBackground image={Images.locationOnboarding}>
    <View>
      <Title>{I18n.t('locationSlide.title')}</Title>
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
              variant={location && location.id && location.id === item.id ? 'default' : 'transparent'}
              onPress={() => { onChange({ fieldName: 'location', value: item }); }}
            />
          )}
          ItemSeparatorComponent={() => (<Spacer size="XL" />)}
          contentContainerStyle={{ flex: 1 }}
        />
      </Block>
    </ScrollView>
  </ImageBackground>
);

LocationSlide.propTypes = {
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

LocationSlide.defaultProps = {
  location: null,
  onChange: () => {},
};

export default LocationSlide;

/*
import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Images from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import Text from '../../Common/Text';

export default class AskLocationScreen extends React.PureComponent {
  static propTypes = {
    askPermission: PropTypes.func.isRequired,
    onSuccessHook: PropTypes.func.isRequired,
  };

  async ask() {
    const { askPermission, onSuccessHook } = this.props;
    await askPermission();
    onSuccessHook();
  }

  render() {
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
            <Title>{I18n.t('askLocationScreen.title')}</Title>
            <Paragraph>{I18n.t('askLocationScreen.subtitle')}</Paragraph>
          </TextContainer>
        </Container>
        <Footer>
          <View>
            {/* <WhiteText>{I18n.t('share-your-location')}</WhiteText> //}
          </View>
          <HorizontalView>
            <TouchableHighlight onPress={() => this.ask()}>
              <View>
                <ButtonText>
                  {I18n.t('askLocationScreen.nextBtnLabel').toUpperCase()}
                </ButtonText>
              </View>
            </TouchableHighlight>
          </HorizontalView>
        </Footer>
        </Container>
        );
      }
    }


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
*/
