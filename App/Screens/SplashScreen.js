import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import FieldBackground from '../Backgrounds/FieldBackground';
import DefaultButton from '../Components/DefaultButton';
import Logo from '../Components/Logo';
import Text from '../Components/Text';
import I18n from '../I18n/index';
import Colors from '../Themes/Colors';

const LogoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const SplashLabel = styled(Text.L)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  font-size: 30px;
`;

const LinkLabel = styled(Text.M)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  text-decoration-line: underline;
`;

export class _SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstRun: null };
  }
  async componentDidMount() {
    const firstRun = !await AsyncStorage.getItem('firstRunDone');
    await AsyncStorage.setItem('firstRunDone', 'true');
    this.setState({ firstRun });
  }

  forwardIfLoggedIn = (props) => {
    if (props.user.uuid) {
      this.props.navigation.navigate('MainNav');
    }
  };

  componentWillReceiveProps(props) {
    // this.forwardIfLoggedIn(props)
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <FieldBackground>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <TextContainer>
          <SplashLabel>
            {I18n.t('Ontdek sportlocaties en activiteiten bij jou in de buurt')}
          </SplashLabel>
        </TextContainer>
        {this.props.user.initialized ? (
          <ButtonsContainer>
            <DefaultButton
              onPress={() => navigate(this.state.firstRun ? 'OnboardingScreen' : 'MainNav')}
              text={I18n.t('Start discovering')}
              bgColor={Colors.actionYellow}
              textColor="white"
              activeOpacity={0.8}
            />
            {!this.props.user.uuid && (
              <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
              </TouchableOpacity>
            )}
          </ButtonsContainer>
        ) : (
          <ButtonsContainer>
            <ActivityIndicator size="large" color="#00ff00" />
          </ButtonsContainer>
        )}
      </FieldBackground>
    );
  }
}

const SplashScreen = connect(state => ({ user: state.user }))(_SplashScreen);
export default SplashScreen;
