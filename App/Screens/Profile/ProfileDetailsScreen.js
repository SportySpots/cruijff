import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../../Components/Text'
import I18n from '../../I18n/index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Slider from '../../Components/Slider'
import styled from 'styled-components/native'
import gql from 'graphql-tag'

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger
} from 'react-native-popup-menu'
import { TabBarTop, TabNavigator } from 'react-navigation'
import Colors from '../../Themes/Colors'
import userActions from '../../Redux/UserRedux'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import UserCircle from '../../Components/UserCircle'

export const BottomNav = new TabNavigator(
  {
    spots: {
      screen: () => <Text>{I18n.t('Spots')}</Text>
    },
    games: {
      screen: () => <Text>{I18n.t('Games')}</Text>
    }
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.white
      },
      labelStyle: {
        color: 'black',
        fontWeight: '700'
      },
      indicatorStyle: {
        backgroundColor: Colors.primaryGreen,
        height: 4
      }
    },
    initialRouteName: 'spots'
  }
)

export class ProfileDetailsScreenComponent extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.any,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      level: PropTypes.number
    })
  }

  onLogout = () => {
    this.props.logout()
    this.props.navigation.navigate('SplashScreen')
  }

  render () {
    const EditMenu = (
      <View style={styles.editMenu}>
        <Menu name='popup'>
          <MenuTrigger menuName='popup'>
            <Icon size={24} name='more-vert' />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() =>
                this.props.navigation.navigate('ProfileEditScreen')
              }
            >
              <Text.M>{I18n.t('Edit')}</Text.M>
            </MenuOption>
            <MenuOption disabled />
            <MenuOption onSelect={this.onLogout}>
              <Text.M style={{ color: 'red' }}>Log out</Text.M>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    )

    const user = this.props.user
    return (
      <MenuProvider>
        <View style={styles.outerContainer}>
          {EditMenu}
          <View style={styles.center}>
            <UserCircle user={user} />
            <NameContainer>
              {user.first_name} {user.last_name}
            </NameContainer>
          </View>
          <View style={styles.ageTypeContainer}>
            {this.props.user.profile && (
              <View style={styles.ageContainer}>
                <Text>{I18n.t('Age')}</Text>
                <Text.L>{this.props.user.profile.year_of_birth}</Text.L>
              </View>
            )}
            {false && (
              <View style={styles.type}>
                <Text>{I18n.t('Style')}</Text>
                <Slider disabled value={0.5} onChange={console.log} />
              </View>
            )}
          </View>
          <View style={styles.bottomNavContainer}>
            <BottomNav style={{ flex: 1 }} />
          </View>
        </View>
      </MenuProvider>
    )
  }
}

const dispatchToProps = {
  logout: userActions.logout
}

const mapStateToProps = state => ({
  user: state.user
})

const ProfileDetailsScreen = connect(mapStateToProps, dispatchToProps)(
  class extends Component {
    static propTypes = {
      user: PropTypes.object,
      navigation: PropTypes.object
    }

    render () {
      return (
        <Query
          query={GET_USER_DETAILS}
          variables={{ uuid: this.props.user.uuid }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>
            if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
            return (
              <ProfileDetailsScreenComponent {...this.props} user={data.user} />
            )
          }}
        </Query>
      )
    }
  }
)

export const GET_USER_DETAILS = gql`
  query user($uuid: UUID) {
    user(uuid: $uuid) {
      uuid
      first_name
      last_name
      #      profile {
      #        year_of_birth
      #      }
    }
  }
`

export default ProfileDetailsScreen

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  center: {
    alignItems: 'center'
  },
  outerContainer: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: Colors.white
  },
  ageTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 16
  },
  ageContainer: {
    flex: 2
  },
  type: {
    flex: 4
  },
  editMenu: {
    position: 'absolute',
    right: 8,
    top: 8
  },
  bottomNavContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.bgGrey,
    backgroundColor: Colors.bgGrey
  }
})

const NameContainer = styled(Text.L)`
  margin: 16px;
`
