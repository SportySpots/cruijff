import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabBarTop, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Slider from '../../Components/Slider';
import Text from '../../Components/Text';
import UserCircle from '../../Components/UserCircle';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import userActions from '../../Redux/UserRedux';
import Colors from '../../Themes/Colors';


export const BottomNav = new TabNavigator(
  {
    spots: {
      screen: () => <Text>{I18n.t('Spots')}</Text>,
    },
    games: {
      screen: () => <Text>{I18n.t('Games')}</Text>,
    },
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.white,
      },
      labelStyle: {
        color: 'black',
        fontWeight: '700',
      },
      indicatorStyle: {
        backgroundColor: Colors.primaryGreen,
        height: 4,
      },
    },
    initialRouteName: 'spots',
  },
);

export class ProfileDetailsScreenComponent extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.any,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      level: PropTypes.number,
    }),
  };

  onLogout = () => {
    this.props.logout();
    this.props.navigation.navigate('SplashScreen');
  };

  render() {
    const user = this.props.data.user;
    const EditMenu = (
      <View style={styles.editMenu}>
        <Menu name="popup">
          <MenuTrigger menuName="popup">
            <Icon size={24} name="more-vert" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => this.props.navigation.navigate('ProfileEditScreen')}>
              <Text.M>{I18n.t('Edit')}</Text.M>
            </MenuOption>
            <MenuOption disabled />
            <MenuOption onSelect={this.onLogout}>
              <Text.M style={{ color: 'red' }}>{I18n.t('Log out')}</Text.M>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );

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
          {false && (
            <View style={styles.bottomNavContainer}>
              <BottomNav style={{ flex: 1 }} />
            </View>
          )}
        </View>
      </MenuProvider>
    );
  }
}

const dispatchToProps = {
  logout: userActions.logout,
};

const mapStateToProps = state => ({
  user: state.user,
});

const ProfileDetailsScreen = connect(mapStateToProps, dispatchToProps)((props) => {
  const Contents = withQuery(GET_USER_DETAILS)(ProfileDetailsScreenComponent);
  return <Contents {...props} variables={{ uuid: props.user.uuid }} />;
});
export default ProfileDetailsScreen;

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
`;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  center: {
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: Colors.white,
  },
  ageTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  ageContainer: {
    flex: 2,
  },
  type: {
    flex: 4,
  },
  editMenu: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  bottomNavContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.bgGrey,
    backgroundColor: Colors.bgGrey,
  },
});

const NameContainer = styled(Text.L)`
  margin: 16px;
`;
