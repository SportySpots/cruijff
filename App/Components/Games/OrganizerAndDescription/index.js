import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Common/Text';
import Organizer from '../Organizer';
import { HorizontalView } from '../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OrganizerAndDescription = ({ organizer, description }) => (
  <HorizontalView>
    <Organizer organizer={organizer} />
    <Text.SM>
      {description ? ` - ${description}` : ''}
    </Text.SM>
  </HorizontalView>
);

OrganizerAndDescription.propTypes = {
  organizer: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  description: PropTypes.string,
};

OrganizerAndDescription.defaultProps = {
  description: '',
};

export default OrganizerAndDescription;
