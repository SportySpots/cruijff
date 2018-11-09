import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { withUser, userPropTypes } from '../../../Context/User';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
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
const ProfileEditScreen = ({ user, refresh, navigation }) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <EditProfileApiCall
        onEditError={handleServerError}
        onEditSuccess={() => {
          // Extend formProps.handleSuccess' default functionality
          handleSuccess(() => {
            refresh();
            navigation.goBack(null);
          });
        }}
      >
        {({ updateProfile }) => (
          <Container>
            <EditProfileForm
              user={user}
              disabled={disabled}
              onBeforeHook={handleBefore}
              onClientCancelHook={handleClientCancel}
              onClientErrorHook={handleClientError}
              // Call api to store data into DB
              onSuccessHook={updateProfile}
            />
          </Container>
        )}
      </EditProfileApiCall>
    )}
  </FormProps>
);

ProfileEditScreen.propTypes = {
  user: userPropTypes.user.isRequired,
  refresh: userPropTypes.refresh.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withUser(ProfileEditScreen);
