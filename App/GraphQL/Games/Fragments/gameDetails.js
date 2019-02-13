import gql from 'graphql-tag';
import userNameAvatarFragment from '../../Users/Fragments/userNameAvatar';

const gameDetailsFragment = gql`
  fragment gameDetailsFragment on GameType {
    id
    uuid
    name
    status
    start_timezone
    start_time
    end_timezone
    end_time
    is_featured
    show_remaining
    capacity
    description
    invite_mode
    sport {
      id
      uuid
      name
      category
    }
    spot {
      id
      uuid
      name
      images {
        uuid
        image
      }
      games {
        uuid
        start_time
        status
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
    organizer {
      id
      uuid
      ...userNameAvatarFragment
    }
    attendees {
      uuid
      status
      user {
        id
        uuid
        ...userNameAvatarFragment
      }
    }
  }
  ${userNameAvatarFragment}
`;

export default gameDetailsFragment;
