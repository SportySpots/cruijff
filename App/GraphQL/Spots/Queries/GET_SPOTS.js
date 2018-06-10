import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS = gql`
  query spots($limit: Int, $offset: Int, $sports__uuid: UUID) {
    spots(limit: $limit, offset: $offset, sports__uuid: $sports__uuid) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export const GET_SPOTS_FOR_SPORT = gql`
  query ($sport: String, $limit: Int, $offset: Int) {
    spots(sports__category: $sport, limit: $limit, offset: $offset) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS;
