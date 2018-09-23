import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS = gql`
  query spots(
    $limit: Int,
    $offset: Int,
    $sports__ids: [ID],
#    $distance: String,
  ) {
    spots(
      is_verified: true,
      limit: $limit,
      offset: $offset,
      sports__ids: $sports__ids,
#      distance: $distance,
    ) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS;
