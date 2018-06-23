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
 */
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
