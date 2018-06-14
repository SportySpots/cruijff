import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import styled from 'styled-components/native';
import Slider from '../../Slider';
import Text from '../../Text';
import UserCircle from '../../UserCircle';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import Tabs from './Tabs';
import EditMenu from './EditMenu';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
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
    right: 16,
    top: 16,
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
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = ({ user, onEdit, onLogout }) => (
  <MenuProvider>
    <View style={styles.outerContainer}>
      <EditMenu
        onEdit={onEdit}
        onLogout={onLogout}
      />
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
          <Tabs style={{ flex: 1 }} />
        </View>
      )}
    </View>
  </MenuProvider>
);

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    level: PropTypes.number,
  }),
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
