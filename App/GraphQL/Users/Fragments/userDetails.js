import gql from 'graphql-tag';

const userDetailsFragment = gql`
  fragment userDetailsFragment on GameType {
    uuid
    first_name
    last_name
    # profile {
    #   year_of_birth
    # }
  }
`;

export default userDetailsFragment;
