import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import UserCircle from '../../../Components/UserCircle';
import PropertyCircle from '../../../Components/PropertyCircle';
import {
  Block,
  BlockLabel,
  HorizontalView,
  ChevronContainer,
} from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const ATTENDEES_TO_SHOW = 7;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getAttendees = game => (
  (game && game.attendees)
    ? game.attendees.filter(rsvp => rsvp.status === 'ATTENDING').map(rsvp => rsvp.user)
    : []
);
//------------------------------------------------------------------------------
const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};
//------------------------------------------------------------------------------
const userCircles = user => (
  <UserCircle
    key={user.uuid}
    user={user}
    style={{ marginRight: 4 }}
  />
);
//------------------------------------------------------------------------------
const restCircle = text => (
  <PropertyCircle
    key="extra"
    text={text}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Attendees = ({ game, onAttendeesPress }) => {
  const attendees = getAttendees(game);

  if (attendees.length === 0) {
    return null;
  }

  return (
    <Block>
      <BlockLabel>{I18n.t('Attending')}</BlockLabel>
      <TouchableOpacity onPress={onAttendeesPress}>
        <HorizontalView>
          <HorizontalView style={{ flex: 1 }}>
            {mapMax(
              ATTENDEES_TO_SHOW,
              attendees,
              userCircles,
              restCircle(`+${attendees.length - (ATTENDEES_TO_SHOW - 1)}`),
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
    </Block>
  );
};

Attendees.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  onAttendeesPress: PropTypes.func,
};

Attendees.defaultProps = {
  onAttendeesPress: () => {},
};

export default Attendees;
