import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import SeedorfAPI from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FIELDS = [
  'userUUID',
  'firstName',
  'lastName',
  'birthYear',
  // TODO: add remaining fields
];
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the ProfileEditForm and calls API to store
 * data into the DB.
 */
class EditProfileApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { onEditError, onEditSuccess } = this.props;

    const doc = pick(inputFields, FIELDS);
    // Make sure birthYear is numeric
    if (inputFields.birthYear) {
      doc.birthYear = parseInt(inputFields.birthYear, 10);
    }

    try {
      const result = await SeedorfAPI.updateProfile(doc);

      // Pass event up to parent component
      if (result && result.ok) {
        onEditSuccess();
      } else {
        onEditError('Something went wrong :(');
      }
    } catch (exc) {
      onEditError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      updateProfile: this.handleUpdate,
    };

    return children(api);
  }
}

EditProfileApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onEditError: PropTypes.func,
  onEditSuccess: PropTypes.func,
};

EditProfileApiCall.defaultProps = {
  onEditError: () => {},
  onEditSuccess: () => {},
};

export default EditProfileApiCall;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import SeedorfAPI from '../../../Services/SeedorfApi';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import ProfileForm from './ProfileForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets data from the ProfileForm and stores it into the DB.
 /
class ProfileUpdate extends React.PureComponent {
  handleSubmit = async ({ uuid, firstName, lastName }) => {
    const { onSuccessHook, onErrorHook } = this.props;

    const doc = { uuid, first_name: firstName, last_name: lastName };

    let result;
    try {
      result = await SeedorfAPI.updateUser(doc);
    } catch (exc) {
      console.log(exc);
    }

    // Pass event up to parent component
    if (!result || !result.ok) {
      onErrorHook();
    } else {
      onSuccessHook();
    }
  };

  render() {
    const { user } = this.props;

    return (
      <ProfileForm
        user={user}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

ProfileUpdate.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onSuccessHook: PropTypes.func,
  onErrorHook: PropTypes.func,
};

ProfileUpdate.defaultProps = {
  onSuccessHook: () => {},
  onErrorHook: () => {},
};

export default ProfileUpdate;

*/
