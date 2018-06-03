import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ScrollView, View } from 'react-native';
import { TabBarTop, TabNavigator } from 'react-navigation';
import styled from 'styled-components';
import Text from '../../Components/Text';
import UserCircle from '../../Components/UserCircle';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import { navigation as navigationPropType } from '../../PropTypesDefinitions/navigation';

export const BottomNav = ({ screens }) =>
  React.createElement(new TabNavigator(screens, {
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
    initialRouteName: 'ATTENDING',
  }));

BottomNav.propTypes = {
  screens: PropTypes.object,
};

const statuses = {
  ATTENDING: {
    label: I18n.t('attending'),
  },
  DECLINED: {
    label: I18n.t('declined'),
  },
  INVITED: {
    label: I18n.t('invited'),
  },
};

const UserRow = ({ attendee }) => {
  const { user } = attendee;
  console.log(attendee);
  return (
    <UserRowContainer>
      <UserCircle user={user} />
      <UserRowRight>
        <Text.M>{user.first_name} {user.last_name}</Text.M>
        <Text.S>
          {I18n.t('Signed up at')}:{' '}
          {moment(attendee.createdAt).format('d MMMM YYYY HH:mm')}
        </Text.S>
      </UserRowRight>
    </UserRowContainer>
  );
};

UserRow.propTypes = {
  attendee: PropTypes.shape({
    user: PropTypes.object, // TODO: use fragment instead
  }).isRequired,
};

const UserRowContainer = styled(View)`
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.lightGray};
`;

const UserRowRight = styled.View`
  flex-direction: column;
  padding-left: 8px;
`;

export const GET_GAME_USERS_LIST = gql`
  query game($uuid: UUID) {
    game(uuid: $uuid) {
      uuid
      attendees {
        uuid
        status
        created_at
        user {
          uuid
          first_name
          last_name
        }
      }
    }
  }
`;

const UserList = ({navigation}) => (
  <Query
    query={GET_GAME_USERS_LIST}
    variables={{ uuid: navigation.state.params.uuid }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;
      const screens = {};
      for (const status of Object.keys(statuses)) {
        const attendees = data.game.attendees.filter(attendee => attendee.status === status);
        screens[status] = {
          screen: () => (
            <ScrollView style={{ flex: 1 }}>
              {attendees.map(attendee => (
                <UserRow key={attendee.user.uuid} attendee={attendee} />
              ))}
            </ScrollView>
          ),
          navigationOptions: {
            tabBarLabel: statuses[status].label,
          },
        };
      }
      return (
        <View style={{ flex: 1 }}>
          <BottomNav screens={screens} />
        </View>
      );
    }}
  </Query>
);

UserList.propTypes = {
  navigation: navigationPropType,
};

export default UserList;
