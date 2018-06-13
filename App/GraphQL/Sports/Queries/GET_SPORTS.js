import gql from 'graphql-tag';
import sportFragment from '../Fragments/sport';

const GET_SPORTS = gql`
  query {
    sports {
      ...sportFragment
    }
  }
  ${sportFragment}
`;

export default GET_SPORTS;
