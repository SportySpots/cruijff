import React from 'react';
import { View } from 'react-native';
import { propType } from 'graphql-anywhere';
import moment from 'moment';
import styled from 'styled-components/native';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import ProfileTabs from '../ProfileTabs';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const AVATAR_SIZE = 56;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 1;
  background-color: ${Colors.bgGrey};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = ({ user }) => [
  <Block key="top">
    <Row alignItems="center">
      <Avatar user={user} size={AVATAR_SIZE} />
      <Spacer orientation="row" size="XXL" />
      <View>
        <Text.ML>{user.first_name} {user.last_name}</Text.ML>
        <Text>{(user.profile && user.profile.country) || ''}</Text>
      </View>
    </Row>
  </Block>,
  <Block key="middle">
    {user.profile && (
      <Row>
        <View style={{ width: AVATAR_SIZE }}>
          <Text>{I18n.t('Age')}</Text>
          <Spacer size="M" />
          <Text.ML>{moment().diff(user.profile.year_of_birth, 'years')}</Text.ML>
        </View>
        <Spacer orientation="row" size="XXL" />
        <View>
          <Text>{I18n.t('Sports')}</Text>
          <Spacer size="M" />
          <Text style={{ color: Colors.black }}>TODO</Text>
        </View>
      </Row>
    )}
  </Block>,
  <Divider key="divider" />,
  <Bottom key="bottom">
    <ProfileTabs user={user} style={{ flex: 1 }} />
  </Bottom>,
];

ProfileDetails.propTypes = {
  user: propType(userDetailsFragment).isRequired,
};

export default ProfileDetails;
