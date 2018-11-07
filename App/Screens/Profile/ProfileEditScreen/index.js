import React from 'react';
import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
// import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import Text from '../../../Components/Common/Text';
import EditProfileApiCall from '../../../Components/Profile/EditProfileApiCall';
import EditProfileForm from '../../../Components/Profile/EditProfileForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: we shouldn't be querying userData here. That should be top level
// userData provider
const ProfileEditScreen = ({ user, navigation }) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <Query
        query={GET_USER_DETAILS}
        variables={{ uuid: user.uuid }}
        fetchPolicy="network-only"
      >
        {({
          loading,
          error,
          data,
          refetch,
        }) => {
          if (loading) return <CenteredActivityIndicator />;
          if (error) return <Text>{JSON.stringify(error)}</Text>;
          if (!data || !data.user) { return null; }

          return (
            <Container>
              <EditProfileApiCall
                onEditError={handleServerError}
                onEditSuccess={() => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    refetch();
                    navigation.goBack(null);
                  });
                }}
              >
                {({ updateProfile }) => (
                  <EditProfileForm
                    user={data.user}
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    // Call api to store data into DB
                    onSuccessHook={updateProfile}
                  />
                )}
              </EditProfileApiCall>
            </Container>
          );
        }}
      </Query>
    )}
  </FormProps>
);

ProfileEditScreen.propTypes = {
  // TODO: implement userProvider and use userDetailsFragment
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(ProfileEditScreen);
