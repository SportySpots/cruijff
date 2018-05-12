import gql from 'graphql-tag';

const spotFragment = gql`
  fragment spotFragment on SpotType {
    uuid
    name
    description
    images {
      image
    }
    address {
      lat
      lng
    }
    sports {
      category
    }
    spot_games {
      uuid
    }
  }
`;

export default spotFragment;
