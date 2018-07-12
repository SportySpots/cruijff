import gql from 'graphql-tag';

const gamePlanFragment = gql`
  fragment gamePlanFragment on GameType {
    uuid
    start_time
    end_time
    capacity
    sport {
      uuid
      name
      category
    }
    spot {
      uuid
      name
    }
  }
`;

export default gamePlanFragment;
