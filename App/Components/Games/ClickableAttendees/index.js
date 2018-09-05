import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import Attendees from '../Attendees';
import { getAttendees } from '../utils';
import { HorizontalView, ChevronContainer } from '../style';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(HorizontalView)`
  justify-content: space-between;
`;
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
      <Container>
        <Attendees game={game} maxLength={maxLength} />
        <ChevronContainer>
          <MaterialIcon
            name="chevron-right"
            size={30}
            color={Colors.black}
          />
        </ChevronContainer>
      </Container>
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
