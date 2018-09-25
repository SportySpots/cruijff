import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS_FOR_SPORT = gql`
  query (
    $sport: String,
    $limit: Int,
    $offset: Int,
  ) {
    spots(
      sports__category: $sport,
      limit: $limit,
      offset: $offset,
      is_verified: true,
    ) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS_FOR_SPORT;
