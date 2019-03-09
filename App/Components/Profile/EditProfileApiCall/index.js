import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';
import { withLocation, locationPropTypes } from '../../../Context/Location';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the ProfileEditForm and calls API to store
 * data into the DB.
 */
class EditProfileApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { setLocation, onEditError, onEditSuccess } = this.props;
    const {
      userUUID,
      userProfileUUID,
      name,
      avatar,
      location,
    } = inputFields;

    // Make sure birthYear is numeric
    /* if (inputFields.birthYear) {
      doc.birthYear = parseInt(inputFields.birthYear, 10);
    } */

    try {
      const res = await SeedorfAPI.updateUserName({ userUUID, name });
      console.log('RES NAME', res);

      // Pass event up to parent component in case of error
      if (res && res.problem) {
        const errors = curateErrors(res.data);
        onEditError(errors);
        return;
      }
    } catch (exc) {
      onEditError(exc);
      return;
    }

    if (avatar.substr(0, 4) === 'data') {
      try {
        const res = await SeedorfAPI.updateUserAvatar({ userUUID, userProfileUUID, avatar });
        console.log('RES AVATAR', res);

        // Pass event up to parent component in case of error
        if (res && res.problem) {
          const errors = curateErrors(res.data);
          onEditError(errors);
          return;
        }
      } catch (exc) {
        onEditError(exc);
        return;
      }
    }

    try {
      // Set user location
      await setLocation(location);
    } catch (exc) {
      onEditError(exc);
      return;
    }

    // Pass event up to parent component
    onEditSuccess();
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
  setLocation: locationPropTypes.setLocation.isRequired,
  onEditError: PropTypes.func,
  onEditSuccess: PropTypes.func,
};

EditProfileApiCall.defaultProps = {
  onEditError: () => {},
  onEditSuccess: () => {},
};

export default withLocation(EditProfileApiCall);
