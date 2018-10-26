import gql from 'graphql-tag';

const userNameAvatarFragment = gql`
  fragment userNameAvatarFragment on UserType {
    first_name
    last_name
    profile {
      id
      uuid
      avatar
    }
  }
`;

export default userNameAvatarFragment;
