import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS = gql`
  query spots(
    $sports__ids: [ID],
    $distance: String,
    $limit: Int,
    $offset: Int,
    $ordering: String,
  ) {
    spots(
      is_verified: true,
      sports__ids: $sports__ids,
      distance: $distance,
      limit: $limit,
      offset: $offset,
      ordering: $ordering,
    ) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS;
