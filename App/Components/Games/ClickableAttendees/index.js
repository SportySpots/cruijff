import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Attendees from '../Attendees';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ClickableAttendees = ({ attendees, maxLength, onAttendeesPress }) => {
  if (attendees.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onAttendeesPress}>
      <Row
        alignItems="center"
        justifyContent="space-between"
      >
        <Attendees attendees={attendees} maxLength={maxLength} />
        <MaterialIcon
          name="chevron-right"
          size={30}
          color={Colors.black}
        />
      </Row>
    </TouchableOpacity>
  );
};

ClickableAttendees.propTypes = {
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['ATTENDING']),
      user: PropTypes.object, // TODO: use userFragment instead
    }),
  ),
  maxLength: PropTypes.number,
  onAttendeesPress: PropTypes.func,
};

ClickableAttendees.defaultProps = {
  attendees: [],
  maxLength: 7,
  onAttendeesPress: () => {},
};

export default ClickableAttendees;
