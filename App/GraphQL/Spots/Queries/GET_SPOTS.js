import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const GET_SPOTS = gql`
  query {
    spots {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default GET_SPOTS;
