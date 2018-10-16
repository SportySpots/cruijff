import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Text from '../../Common/Text';
import UserCircle from '../../Common/UserCircle';
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
      <UserCircle user={organizer} />
      <Spacer orientation="row" size="M" />
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
  organizer: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  textSize: PropTypes.oneOf(Object.keys(Fonts.style)),
  description: PropTypes.string,
};

Organizer.defaultProps = {
  textSize: 'SM',
  description: '',
};

export default Organizer;
