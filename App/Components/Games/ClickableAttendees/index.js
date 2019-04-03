import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Row from '../../Common/Row';
import Icon from '../../Common/Icon';
import Attendees from '../Attendees';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full width */
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
        <FlexOne>
          <Attendees attendees={attendees} />
        </FlexOne>
        <Icon
          iconSet="MaterialIcons"
          iconName="chevron-right"
          size={30}
          color="black"
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
