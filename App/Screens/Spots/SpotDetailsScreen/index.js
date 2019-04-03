import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { withUser, userPropTypes } from '../../../Context/User';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import SpotDetails from '../../../Components/Spots/SpotDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: implement pagination
class SpotDetailsScreen extends React.PureComponent {
  handleGamePress = (game) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetailsScreen', { uuid: game.uuid });
  }

  render() {
    const { navigation, user } = this.props;

    return (
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: navigation.state.params.uuid }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>{JSON.stringify(error)}</Text>;
          if (!data || !data.spot) return null;

          return (
            <Container>
              <SpotDetails
                spot={data.spot}
                userUUID={(user && user.uuid) || null}
                onGamePress={this.handleGamePress}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

SpotDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  user: userPropTypes.user,
};

SpotDetailsScreen.defaultProps = {
  user: null,
};

export default withUser(SpotDetailsScreen);
