import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Attendees from '../Attendees';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ClickableAttendees = ({ attendees, onAttendeesPress }) => {
  if (attendees.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onAttendeesPress}>
      <Row alignItems="center">
        <FlexGrow>
          <Attendees attendees={attendees} />
        </FlexGrow>
        <Icon
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
  onAttendeesPress: PropTypes.func,
};

ClickableAttendees.defaultProps = {
  attendees: [],
  onAttendeesPress: () => {},
};

export default ClickableAttendees;
