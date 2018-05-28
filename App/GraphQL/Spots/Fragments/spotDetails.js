import gql from 'graphql-tag';

const spotDetailsFragment = gql`
  fragment spotDetailsFragment on SpotType {
    uuid
    name
    images {
      uuid
      image
    }
    amenities {
      uuid
      sport {
        uuid
        category
      }
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
`;

export default spotDetailsFragment;
