import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS = gql`
  query spots($limit: Int, $offset: Int) {
    spots(limit: $limit, offset: $offset) {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS;
