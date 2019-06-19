import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../../../Context/User';
import { withLocation, locationPropTypes } from '../../../Context/Location';
import FormProps from '../../../RenderProps/form-props';
import EditProfileApiCall from '../../../Components/Profile/EditProfileApiCall';
import EditProfileForm from '../../../Components/Profile/EditProfileForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileEditScreen = ({
  user,
  refetchUser,
  locationCity,
  locationSetCity,
  navigation,
}) => (
  <FormProps>
    {({
      disabled,
      errors,
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
          handleSuccess(async () => {
            await refetchUser();
            navigation.goBack(null);
          });
        }}
      >
        {({ updateProfile }) => (
          <Container>
            <EditProfileForm
              user={user}
              location={locationCity}
              disabled={disabled}
              errors={errors}
              onBeforeHook={handleBefore}
              onClientCancelHook={handleClientCancel}
              onClientErrorHook={handleClientError}
              // Call api to store data into DB
              onSuccessHook={({ locationCity: newCity, ...profileFields }) => {
                locationSetCity(newCity);
                return updateProfile(profileFields);
              }}
            />
          </Container>
        )}
      </EditProfileApiCall>
    )}
  </FormProps>
);

ProfileEditScreen.propTypes = {
  user: userPropTypes.user.isRequired,
  refetchUser: userPropTypes.refetchUser.isRequired,
  locationCity: locationPropTypes.locationCity.isRequired,
  locationSetCity: locationPropTypes.locationSetCity.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withUser,
  withLocation,
);

export default enhance(ProfileEditScreen);
