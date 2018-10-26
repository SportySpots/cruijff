import gql from 'graphql-tag';
import userNameAvatarFragment from '../../Users/Fragments/userNameAvatar';

const gameFragment = gql`
  fragment gameFragment on GameType {
    uuid
    status
    name
    start_time
    end_time
    is_featured
    show_remaining
    capacity
    sport {
      uuid
      category
    }
    organizer {
      uuid
      ...userNameAvatarFragment
    }
    spot {
      uuid
      name
      images {
        uuid
        image
      }
      amenities {
        uuid
        #sport {
        #  uuid
        #  category
        #}
        data
      }
      sports {
        uuid
        category
      }
      address {
        uuid
        lat
        lng
      }
    }
    attendees {
      uuid
      status
      user {
        uuid
        ...userNameAvatarFragment
      }
    }
  }
  ${userNameAvatarFragment}
`;

export default gameFragment;
