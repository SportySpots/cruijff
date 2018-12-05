import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import SeedorfAPI from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FIELDS = [
  'userUUID',
  'userProfileUUID',
  'firstName',
  'lastName',
  // 'birthYear',
  'avatar',
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
    const {
      userUUID,
      userProfileUUID,
      firstName,
      lastName,
      avatar,
    } = inputFields;

    // Make sure birthYear is numeric
    /* if (inputFields.birthYear) {
      doc.birthYear = parseInt(inputFields.birthYear, 10);
    } */

    try {
      const resName = await SeedorfAPI.updateUserName({ userUUID, firstName, lastName });
      console.log('RES NAME', resName);
      // Pass event up to parent component in case of error
      if (resName && resName.problem) {
        // const errors = curateErrors(response.data);
        onEditError(resName.data); // TODO: curate errors
        return;
      }

      console.log('AVATAR', avatar);

      if (avatar.substr(0, 4) === 'data') {
        console.log('IN', avatar.substr(0, 4));
        const resAvatar = await SeedorfAPI.updateUserAvatar({ userUUID, userProfileUUID, avatar });
        console.log('RES AVATAR', resAvatar);
        // Pass event up to parent component in case of error
        if (resAvatar && resAvatar.problem) {
          // const errors = curateErrors(response.data);
          onEditError(resAvatar.data); // TODO: curate errors
          return;
        }
      }
      onEditSuccess();
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
