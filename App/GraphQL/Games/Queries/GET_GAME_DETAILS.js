import gql from 'graphql-tag';
import gameDetailsFragment from '../Fragments/gameDetails';

const GET_GAME_DETAILS = gql`
  query game($uuid: UUID!) {
    game(uuid: $uuid) {
      ...gameDetailsFragment
    }
  }
  ${gameDetailsFragment}
`;

export default GET_GAME_DETAILS;
