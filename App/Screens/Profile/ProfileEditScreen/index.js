import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
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
      // errorMsg,
      // successMsg,
      handleBefore,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
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
          if (!data || !data.user) { return null; }

          return (
            <Container>
              <EditProfileApiCall
                onSendError={handleServerError}
                onSendSuccess={() => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    // Show success message after action is completed
                    setSuccessMessage('A new email has been sent to your inbox!');
                    // Switch to passCodeView view
                    this.setState({ view: 'passCodeView' });
                  });
                }}
              >
                {({ updateProfile }) => (
                  <EditProfileForm
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onClientErrorHook={handleClientError}
                    onSuccessHook={(inputFields) => {
                      // Call api to store data into DB
                      updateProfile(inputFields);
                    }}
                  />
                )}
              </EditProfileApiCall>

              <ProfileUpdate
                user={user}
                onSuccessHook={onEditSuccess}
                onErrorHook={onEditError}
              />,
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
    )}
  </FormProps>
);

ProfileEditScreen.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps);

export default withRedux(ProfileEditScreen);

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Query, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Text from '../../../Components/Common/Text';
import Colors from '../../../Themes/Colors';
import ProfileEdit from '../../../Components/Profile/ProfileEdit';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

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

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps);

const enhance = compose(
  withNavigation,
  withRedux,
);

export default withRedux(ProfileEditScreen);
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Query, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import Text from '../../../Components/Common/Text';
import Colors from '../../../Themes/Colors';
import ProfileEdit from '../../../Components/Profile/ProfileEdit';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

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

// Redux integration
const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps);

const enhance = compose(
  withNavigation,
  withRedux,
);

export default enhance(ProfileEditScreen);

*/
