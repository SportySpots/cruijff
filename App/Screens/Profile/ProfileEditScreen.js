import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import GET_USER_DETAILS from '../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Text from '../../Components/Text';
import Colors from '../../Themes/Colors';
import ProfileEdit from '../../Components/Profile/ProfileEdit';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding-top: 16px;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileEditScreen = ({ user, navigation }) => (
  <Query
    query={GET_USER_DETAILS}
    variables={{ uuid: user.uuid }}
  >
    {({
      loading,
      error,
      data,
      refetch,
    }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

      return (
        <Container>
          <ProfileEdit
            user={data.user}
            onEditSuccess={() => {
              refetch();
              navigation.goBack(null);
            }}
            onEditError={console.log}
          />
        </Container>
      );
    }}
  </Query>
);

ProfileEditScreen.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps);

export default withRedux(ProfileEditScreen);
