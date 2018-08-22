import React from 'react';
import PropTypes from 'prop-types';
import { Query, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../Themes/Colors';
import userActions from '../../Redux/UserRedux';
import GET_USER_DETAILS from '../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Text from '../../Components/Common/Text';
import ProfileDetails from '../../Components/Profile/ProfileDetails';
import CenteredActivityIndicator from '../../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ProfileDetailsScreen extends React.PureComponent {
  handleLogout = () => {
    const { logout, navigation } = this.props;
    // TODO: reset store
    logout();
    navigation.navigate('SplashScreen');
  }

  handleEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEditScreen');
  }

  render() {
    const { user } = this.props;

    return (
      <Query
        query={GET_USER_DETAILS}
        variables={{ uuid: user.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;
          if (!data || !data.user) { return null; }

          return (
            <Container>
              <ProfileDetails
                user={data.user}
                onEdit={this.handleEdit}
                onLogout={this.handleLogout}
              />
            </Container>
          );
        }}
      </Query>
    );
  }
}

ProfileDetailsScreen.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

// Redux integration
const dispatchToProps = { logout: userActions.logout };
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, dispatchToProps);

const enhance = compose(
  withNavigation,
  withRedux,
);

export default enhance(ProfileDetailsScreen);
