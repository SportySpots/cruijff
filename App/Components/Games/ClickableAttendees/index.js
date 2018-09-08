import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import Row from '../../Common/Row';
import Attendees from '../Attendees';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ClickableAttendees = ({ game, maxLength, onAttendeesPress }) => {
  const attendees = getAttendees(game);

  if (attendees.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onAttendeesPress}>
      <Row
        alignItems="center"
        justifyContent="space-between"
      >
        <Attendees game={game} maxLength={maxLength} />
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
  game: propType(gameDetailsFragment).isRequired,
  maxLength: PropTypes.number,
  onAttendeesPress: PropTypes.func,
};

ClickableAttendees.defaultProps = {
  maxLength: 7,
  onAttendeesPress: () => {},
};

export default ClickableAttendees;
