import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS_FOR_SPORT = gql`
  query spots(
    $sports__ids: [ID],
    $limit: Int,
    $offset: Int,
  ) {
    spots(
      sports__ids: $sports__ids,
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
