import gql from 'graphql-tag';

const userNameAvatarFragment = gql`
  fragment userNameAvatarFragment on UserType {
    name
    profile {
      id
      uuid
      avatar
    }
  }
`;

export default userNameAvatarFragment;
