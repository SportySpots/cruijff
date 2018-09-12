import React from 'react';
import PropTypes from 'prop-types';
import Fonts from '../../../Themes/Fonts';
import Text from '../../Common/Text';
import UserCircle from '../../Common/UserCircle';
import Spacer from '../../Common/Spacer';
import Row from '../../Common/Row';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ organizer, textSize }) => {
  const TextSize = Text[textSize];

  return (
    <Row alignItems="center">
      <UserCircle user={organizer} />
      <Spacer direction="row" size="M" />
      <TextSize>
        {organizer.first_name} {organizer.last_name}
      </TextSize>
    </Row>
  );
};

Organizer.propTypes = {
  organizer: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  textSize: PropTypes.oneOf(Object.keys(Fonts.style)),
};

Organizer.defaultProps = {
  textSize: 'SM',
};

export default Organizer;
