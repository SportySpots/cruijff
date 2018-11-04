import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import FormProps from '../../../RenderProps/form-props';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import AvatarPickerForm from '../AvatarPickerForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AvatarPicker = ({ user, onUploadSuccess }) => (
  <FormProps>
    {({
      disabled,
      errors,
      handleBefore,
      handleClientCancel,
      handleClientError,
      handleSuccess,
    }) => (
      <AvatarPickerForm
        user={user}
        disabled={disabled}
        errors={errors}
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={(avatar) => {
          handleSuccess(() => {
            // Pass event up to parent component
            onUploadSuccess(avatar);
          });
        }}
      />
    )}
  </FormProps>
);

AvatarPicker.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onUploadSuccess: PropTypes.func,
};

AvatarPicker.defaultProps = {
  onUploadSuccess: () => {},
};

export default AvatarPicker;
