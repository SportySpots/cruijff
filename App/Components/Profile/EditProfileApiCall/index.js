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

    const doc = pick(inputFields, FIELDS);
    // Make sure birthYear is numeric
    if (inputFields.birthYear) {
      doc.birthYear = parseInt(inputFields.birthYear, 10);
    }

    try {
      const response = await SeedorfAPI.updateProfile(doc);

      // Pass event up to parent component
      if (response && response.problem) {
        console.log('RESPONSE', response.data);
        // const errors = curateErrors(response.data);
        onEditError(response.data); // TODO: curate errors
      } else {
        onEditSuccess();
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
