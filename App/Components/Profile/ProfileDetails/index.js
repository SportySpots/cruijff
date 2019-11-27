import React from 'react';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import userStore from 'App/Stores/User';
import {observer} from "mobx-react";

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// const Bottom = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.bgGrey};
// `;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetails = () => [
  <Block key="top">
    <Row justifyContent="center">
      <Avatar user={userStore.user} size="L" />
    </Row>
    <Spacer size="XL" />
    <Text size="L" center>
      {userStore.user.name}
    </Text>
    <Spacer size="S" />
  </Block>,
  /* <Spacer key="spacer" size="M" />,
  <Divider key="divider" />,
  <Bottom key="bottom">
    <ProfileTabs user={user} style={{ flex: 1 }} />
  </Bottom>, */
];

export default observer(ProfileDetails);
