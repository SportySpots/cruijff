import gql from 'graphql-tag';

const spotFragment = gql`
  fragment spotFragment on SpotType {
    uuid
    name
    images {
      image
    }
    address {
      lat
      lng
    }
    sports {
      uuid
      category
    }
    spot_games {
      uuid
    }
  }
`;

export default spotFragment;
