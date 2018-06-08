import gql from 'graphql-tag';
import gameFragment from '../Fragments/game';

const GET_GAMES_LIST = gql`
  query games(
    $limit: Int,
    $offset: Int,
    $ordering: String,
    $start_time__gte: DateTime,
  ) {
    games(
      limit: $limit,
      offset: $offset,
      ordering: $ordering,
      start_time__gte: $start_time__gte,
    ) {
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
      # maxStartTime: $maxStartTime
      # minStartTime: $minStartTime
      # orderBy: "startTime"
      # isListed: true
    }
  }
`;
*/
