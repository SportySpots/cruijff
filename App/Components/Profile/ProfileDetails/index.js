import React from 'react';
import styled from 'styled-components/native';
import { userPropTypes } from '../../../Context/User';
import Colors from '../../../Themes/Colors';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import ProfileTabs from '../ProfileTabs';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Bottom = styled.View`
  flex: 1;
  background-color: ${Colors.bgGrey};
`;
//------------------------------------------------------------------------------
const Name = styled(Text.L)`
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = ({ user }) => [
  <Block key="top">
    <Row justifyContent="center">
      <Avatar user={user} size={80} />
    </Row>
    <Spacer size="XL" />
    <Name>
      {`${user.name}`}
    </Name>
  </Block>,
  /* <Spacer key="spacer" size="M" />,
  <Divider key="divider" />,
  <Bottom key="bottom">
    <ProfileTabs user={user} style={{ flex: 1 }} />
  </Bottom>, */
];

ProfileDetails.propTypes = {
  user: userPropTypes.user.isRequired,
};

export default ProfileDetails;
