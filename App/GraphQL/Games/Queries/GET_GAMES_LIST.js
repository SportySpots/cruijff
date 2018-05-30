import gql from 'graphql-tag';
import gameFragment from '../Fragments/game';

const GET_GAMES_LIST = gql`
  query {
    games {
      ...gameFragment
    }
  }
  ${gameFragment}
`;

export default GET_GAMES_LIST;

/*
export const GET_GAMES_LIST = gql`
  #  query games($minStartTime: String!, $maxStartTime: String!) {
  query games {
    games {
      #      maxStartTime: $maxStartTime #      minStartTime: $minStartTime #      orderBy: "startTime" #      isListed: true

    }
  }
`;
*/
