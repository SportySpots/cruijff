import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Text from '../../Common/Text';
import UserCircle from '../../Common/UserCircle';
import { HorizontalView } from '../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Spacer = styled.View`
  width: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Organizer = ({ organizer, textSize }) => {
  const TextSize = Text[textSize];

  return (
    <HorizontalView>
      <UserCircle user={organizer} />
      <Spacer />
      <TextSize>
        {organizer.first_name} {organizer.last_name}
      </TextSize>
    </HorizontalView>
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
