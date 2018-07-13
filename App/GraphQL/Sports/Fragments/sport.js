import gql from 'graphql-tag';

const sportFragment = gql`
  fragment sportFragment on SportType {
    uuid
    id
    name
    category
  }
`;

export default sportFragment;
