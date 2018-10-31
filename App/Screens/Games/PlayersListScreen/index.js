import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import GET_GAME_USERS_LIST from '../../../GraphQL/Games/Queries/GET_GAME_USERS_LIST';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import PlayersTabs from '../../../Components/Games/PlayersTabs';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersListScreen = ({ navigation }) => (
  <Query
    query={GET_GAME_USERS_LIST}
    variables={{ uuid: navigation.state.params.uuid }}
  >
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>{JSON.stringify(error)}</Text>;

      const attendees = data.game.attendees.filter(attendee => attendee.status === 'ATTENDING');
      const absents = data.game.attendees.filter(attendee => attendee.status === 'DECLINED');

      return (
        <View style={{ flex: 1 }}>
          <PlayersTabs
            attendees={attendees}
            absents={absents}
          />
        </View>
      );
    }}
  </Query>
);

PlayersListScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PlayersListScreen;


/*
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { ScrollView, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Text from '../../../Components/Common/Text';
import Avatar from '../../../Components/Common/Avatar';
import navigationPropTypes from '../../../PropTypesDefinitions/navigation';

// TODO: refactor
export const BottomNav = ({ screens }) => (
  React.createElement(createMaterialTopTabNavigator(screens, {
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
  }))
);

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
};

const UserRow = ({ attendee }) => {
  const { user } = attendee;

  return (
    <UserRowContainer>
      <Avatar user={user} />
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
          ...userNameAvatarFragment
        }
      }
    }
  }
  ${userNameAvatarFragment}
`;

const UserList = ({ navigation }) => (
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
  navigation: navigationPropTypes,
};

export default UserList;

*/
