import gql from 'graphql-tag';

const spotFragment = gql`
  fragment spotFragment on SpotType {
    uuid
    name
    images {
      uuid
      image
    }
    address {
      uuid
      lat
      lng
    }
    sports {
      uuid
      category
    }
    games {
      uuid
    }
  }
`;

export default spotFragment;
