import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Divider from '../../Common/Divider';
import PlayerRow from '../PlayerRow';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlayersList = ({ players }) => (
  <Container>
    {players.map(player => [
      <PlayerRow key={player.user.uuid} player={player} />,
      <Divider key={`divider-${player.user.uuid}`} />,
    ])}
  </Container>
);

PlayersList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      user: propType(userDetailsFragment),
      createdAt: PropTypes.instanceOf(Date),
    }),
  ),
};

PlayersList.defaultProps = {
  players: [],
};

export default PlayersList;
