import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import FieldBackground from '../Backgrounds/FieldBackground';
import DefaultButton from '../Components/DefaultButton';
import Logo from '../Components/Logo';
import Text from '../Components/Text';
import I18n from '../I18n/index';
import Colors from '../Themes/Colors';

const styles = StyleSheet.create({
  logo: {
    height: 80,
    width: 80,
  },
  logoContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  skipActionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
});

const SplashLabel = styled(Text.L)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  `;

const LinkLabel = styled(Text.M)`
  color: ${props => props.textColor || '#fff'}
  text-align: center;
  text-decoration-line: underline;
`;

export class _SplashScreen extends Component {
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
    navigation: PropTypes.navigation,
  };

  static defaultProps = {
    navigation: undefined,
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <FieldBackground>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.textContainer}>
          <SplashLabel>Ontdek sportlocaties en activiteiten bij jou in de buurt</SplashLabel>
        </View>
        {this.props.user.initialized ? (
          <View style={styles.buttonsContainer}>
            <DefaultButton
              onPress={() => navigate(this.state.firstRun ? 'OnboardingScreen' : 'MainNav')}
              text={I18n.t('Start discovering')}
              bgColor={Colors.actionYellow}
              textColor="white"
            />
            {!this.props.user.uuid && (
              <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </FieldBackground>
    );
  }
}

const SplashScreen = connect(state => ({ user: state.user }))(_SplashScreen);
export default SplashScreen;
