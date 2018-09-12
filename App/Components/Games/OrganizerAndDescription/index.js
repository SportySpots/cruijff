import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Organizer from '../Organizer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OrganizerAndDescription = ({ organizer, description }) => (
  <Row alignItems="center">
    <Organizer organizer={organizer} />
    <Text.SM>
      {description ? ` - ${description}` : ''}
    </Text.SM>
  </Row>
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
