import gql from 'graphql-tag';
import userDetailsFragment from '../Fragments/userDetails';

const GET_USER_DETAILS = gql`
  query user($email: String, $uuid: UUID, $id: ID) {
    user(email: $email, uuid: $uuid, id: $id) {
      ...userDetailsFragment
    }
  }
  ${userDetailsFragment}
`;

export default GET_USER_DETAILS;
