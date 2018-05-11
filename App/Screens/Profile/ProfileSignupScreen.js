import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DefaultButton from '../../Components/DefaultButton';
import I18n from '../../I18n/index';
import Text from '../../Components/Text';
import images from '../../Themes/Images';
import styled from 'styled-components/native';
import userActions from '../../Redux/UserRedux';
import { connect } from 'react-redux';

class _ProfileSignupScreen extends Component {
  componentWillMount() {
    if (this.props.user.uuid) {
      this.props.navigation.navigate('ProfileDetailsScreen');
    }
  }
  componentWillReceiveProps(newProps) {
    if (!this.props.user.uuid && newProps.user.uuid) {
      this.props.navigation.navigate('LoggedInProfileNav');
    }
  }
  render() {
    if (this.props.user.uuid) {
      return null;
    }
    return (
      <MainContainer>
        <View style={{ alignItems: 'center' }}>
          <Image source={images.createProfileAvatar} />
          <View style={{ height: 32 }} />
          <Text.L>{I18n.t('Sign up')}!</Text.L>
          <View style={{ height: 32 }} />
          <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
        </View>
        <ButtonContainer>
          <DefaultButton
            onPress={() => this.props.navigation.navigate('SignupScreen')}
            text={I18n.t('Register')}
          />
        </ButtonContainer>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
        </TouchableOpacity>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const ProfileSignupScreen = connect(mapStateToProps)(_ProfileSignupScreen);
export default ProfileSignupScreen;

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  align-self: stretch;
`;

const LinkLabel = styled(Text.M)`
  text-align: center;
  text-decoration-line: underline;
`;
