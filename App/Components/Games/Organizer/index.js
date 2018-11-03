import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import Fonts from '../../../Themes/Fonts';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ organizer, textSize }) => {
  const TextSize = Text[textSize.toUpperCase()];

  return (
    <Row alignItems="center">
      <Avatar user={organizer} />
      <Spacer row size="M" />
      <TextSize>
        {`${organizer.first_name} ${organizer.last_name}`}
      </TextSize>
    </Row>
  );
};

Organizer.propTypes = {
  organizer: propType(userNameAvatarFragment).isRequired,
  textSize: PropTypes.oneOf(Object.keys(Fonts.style)),
};

Organizer.defaultProps = {
  textSize: 'SM',
};

export default Organizer;
