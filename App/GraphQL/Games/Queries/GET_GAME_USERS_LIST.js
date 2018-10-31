import gql from 'graphql-tag';
import userNameAvatarFragment from '../../Users/Fragments/userNameAvatar';

const GET_GAME_USERS_LIST = gql`
  query game($uuid: UUID) {
    game(uuid: $uuid) {
      uuid
      attendees {
        uuid
        status
        created_at
        user {
          uuid
          ...userNameAvatarFragment
        }
      }
    }
  }
  ${userNameAvatarFragment}
`;

export default GET_GAME_USERS_LIST;
