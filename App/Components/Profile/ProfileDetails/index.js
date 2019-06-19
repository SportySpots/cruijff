import React from 'react';
// import styled from 'styled-components/native';
import I18n from '../../../I18n';
import { userPropTypes } from '../../../Context/User';
import { locationPropTypes } from '../../../Context/Location';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
// import Divider from '../../Common/Divider';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
// import ProfileTabs from '../ProfileTabs';

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
const ProfileDetails = ({ user, locationCity }) => [
  <Block key="top">
    <Row justifyContent="center">
      <Avatar user={user} size="L" />
    </Row>
    <Spacer size="XL" />
    <Text size="L" center>
      {user.name}
    </Text>
    <Spacer size="S" />
    {!!locationCity && (
      <Text size="M" color="gray" center>
        {locationCity}
      </Text>
    )}
  </Block>,
  /* <Spacer key="spacer" size="M" />,
  <Divider key="divider" />,
  <Bottom key="bottom">
    <ProfileTabs user={user} style={{ flex: 1 }} />
  </Bottom>, */
];

ProfileDetails.propTypes = {
  user: userPropTypes.user.isRequired,
  locationCity: locationPropTypes.locationCity.isRequired,
};

export default ProfileDetails;
