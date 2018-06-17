import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { StyleSheet, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components/native';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Slider from '../../Slider';
import Text from '../../Text';
import UserCircle from '../../UserCircle';
import Tabs from './Tabs';
import EditMenu from './EditMenu';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const styles = StyleSheet.create({
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
});
//------------------------------------------------------------------------------
const Outer = styled.View`
  flex: 1;
  paddingTop: 24;
  backgroundColor: ${Colors.white};
`;
//------------------------------------------------------------------------------
const NameContainer = styled(Text.L)`
  margin: 16px;
`;
//------------------------------------------------------------------------------
const TabsContainer = styled.View`
  flex: 1;
  border-top-width: 2;
  border-top-color: ${Colors.bgGrey};
  background-color: ${Colors.bgGrey};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = ({ user, onEdit, onLogout }) => (
  <MenuProvider>
    <Outer>
      <EditMenu
        onEdit={onEdit}
        onLogout={onLogout}
      />
      <View style={styles.center}>
        <UserCircle
          size={75}
          user={user}
        />
        <NameContainer>
          {user.first_name} {user.last_name}
        </NameContainer>
      </View>
      <View style={styles.ageTypeContainer}>
        {user.profile && (
          <View style={styles.ageContainer}>
            <Text>{I18n.t('Age')}</Text>
            {/* <Text.L>{user.profile.year_of_birth}</Text.L> */}
          </View>
        )}
        {/* <View style={styles.type}>
            <Text>{I18n.t('Style')}</Text>
            <Slider disabled value={0.5} onChange={console.log} />
          </View> */}
      </View>
      <TabsContainer>
        {/* TODO: pass user as a prop and use UserSpots and UserGames comps */}
        <Tabs style={{ flex: 1 }} />
      </TabsContainer>
    </Outer>
  </MenuProvider>
);

ProfileDetails.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onEdit: PropTypes.func,
  onLogout: PropTypes.func,
};

ProfileDetails.defaultProps = {
  onEdit: () => {},
  onLogout: () => {},
};

export default ProfileDetails;

/* const dispatchToProps = {
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


*/
