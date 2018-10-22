import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Text from '../../Common/Text';
import Avatar from '../../Common/Avatar';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  padding-top: 8.5px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ organizer, textSize, description }) => {
  const TextSize = Text[textSize.toUpperCase()];

  return (
    <Row>
      <Avatar user={organizer} />
      <Spacer row size="M" />
      <Container>
        <TextSize>
          {organizer.first_name} {organizer.last_name}
          {description ? ` - ${description}` : ''}
        </TextSize>
      </Container>
    </Row>
  );
};

Organizer.propTypes = {
  organizer: propType(userNameAvatarFragment).isRequired,
  textSize: PropTypes.oneOf(Object.keys(Fonts.style)),
  description: PropTypes.string,
};

Organizer.defaultProps = {
  textSize: 'SM',
  description: '',
};

export default Organizer;
