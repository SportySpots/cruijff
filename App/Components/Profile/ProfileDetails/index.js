import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
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
const Outer = styled.View`
  flex: 1;
  padding-top: 24;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Avatar = styled.View`
  align-items: center;
`;
//------------------------------------------------------------------------------
const Name = styled(Text.L)`
  margin: 16px;
`;
//------------------------------------------------------------------------------
const Profile = styled.View`
  flex-direction: row;
  margin: 0 16px;
`;
//------------------------------------------------------------------------------
const Age = styled.View`
  flex: 2;
`;
//------------------------------------------------------------------------------
const Competitiveness = styled.View`
  flex: 4;
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
      <EditMenu onEdit={onEdit} onLogout={onLogout} />
      <Avatar>
        <UserCircle user={user} size={75} />
        <Name>{user.first_name} {user.last_name}</Name>
      </Avatar>
      {user.profile && (
        <Profile>
          <Age>
            <Text>{I18n.t('Age')}</Text>
            {/* <Text.L>{user.profile.year_of_birth}</Text.L> */}
          </Age>
          <Competitiveness>
            <Text>{I18n.t('Style')}</Text>
            {/* <Slider disabled value={0.5} onChange={console.log} /> */}
          </Competitiveness>
        </Profile>
      )}
      <TabsContainer>
        <Tabs user={user} style={{ flex: 1 }} />
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
