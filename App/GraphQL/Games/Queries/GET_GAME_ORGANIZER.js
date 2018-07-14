import gql from 'graphql-tag';
import gameOrganizerFragment from '../Fragments/gameOrganizer';

const GET_GAME_ORGANIZER = gql`
  query game($uuid: UUID!) {
    game(uuid: $uuid) {
      ...gameOrganizerFragment
    }
  }
  ${gameOrganizerFragment}
`;

export default GET_GAME_ORGANIZER;
