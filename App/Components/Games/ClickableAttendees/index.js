import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import Attendees from '../Attendees';
import { getAttendees } from '../utils';
import { HorizontalView, ChevronContainer } from '../style';

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
      <HorizontalView>
        <Attendees game={game} maxLength={maxLength} />
        <ChevronContainer>
          <MaterialIcon
            name="chevron-right"
            size={30}
            color={Colors.black}
          />
        </ChevronContainer>
      </HorizontalView>
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../../Components/Common/UserCircle';
import PropertyCircle from '../../../Components/Common/PropertyCircle';
import { getAttendees, mapMax } from '../utils';
import { HorizontalView, ChevronContainer } from '../style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const userCircle = user => (
  <UserCircle
    key={user.uuid}
    user={user}
    style={{ marginRight: 4 }}
  />
);
//------------------------------------------------------------------------------
const restCircle = text => () => (
  <PropertyCircle
    key="extra"
    text={text}
  />
);
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
      <HorizontalView>
        <HorizontalView style={{ flex: 1 }}>
          {mapMax(
            maxLength,
            attendees,
            userCircle,
            restCircle(`+${attendees.length - (maxLength - 1)}`),
          )}
        </HorizontalView>
        <ChevronContainer>
          <MaterialIcon
            name="chevron-right"
            size={30}
            color={Colors.black}
          />
        </ChevronContainer>
      </HorizontalView>
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

*/