import gql from 'graphql-tag';
import userDetailsFragment from '../Fragments/userDetails';

const GET_USER_DETAILS = gql`
  query user($uuid: UUID) {
    user(uuid: $uuid) {
      ...userDetailsFragment
    }
  }
  ${userDetailsFragment}
`;

export default GET_USER_DETAILS;
