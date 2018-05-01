import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import DefaultButton from '../DefaultButton'
import I18n from '../../I18n/index'
import Text from '../Text'
import images from '../../Themes/Images'
import styled from 'styled-components/native'
import userActions from '../../Redux/UserRedux'
import { connect } from 'react-redux'

class _ProfileLoginScreen extends Component {
  componentWillMount () {
    if (this.props.user.uuid) {
      this.props.navigation.navigate('ProfileDetailsScreen')
    }
  }
  componentWillReceiveProps (newProps) {
    if (!this.props.user.uuid && newProps.user.uuid) {
      this.props.navigation.navigate('LoggedInProfileNav')
    }
  }
  render () {
    if (this.props.user.uuid) {
      return null
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
            onPress={() => this.props.navigation.navigate('StackSignupScreen')}
            text={I18n.t('Register')}
          />
        </ButtonContainer>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const ProfileLoginScreen = connect(mapStateToProps)(_ProfileLoginScreen)
export default ProfileLoginScreen

const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.View`
  align-self: stretch;
`
