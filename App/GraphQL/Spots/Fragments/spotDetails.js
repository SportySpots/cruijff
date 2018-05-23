import gql from 'graphql-tag';

const spotDetailsFragment = gql`
  fragment spotDetailsFragment on SpotType {
    uuid
    name
    images {
      image
    }
    amenities {
      sport {
        category
      }
      data
    }
    sports {
      category
    }
    address {
      lat
      lng
    }
  }
`;

export default spotDetailsFragment;
