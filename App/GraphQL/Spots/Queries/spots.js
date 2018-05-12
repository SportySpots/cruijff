import gql from 'graphql-tag';
import spotFragment from '../Fragments/spot';

const spots = gql`
  query {
    spots {
      ...spotFragment
    }
  }
  ${spotFragment}
`;

export default spots;
