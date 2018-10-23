import React from 'react';
import PropTypes from 'prop-types';
import SeedorfApi from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class RSVPApiCall extends React.PureComponent {
  handleUpdate = async (inputFields) => {
    const { onRSVPSuccess, onRSVPError } = this.props;
    const { gameUUID, userRSVP, status } = inputFields;

    try {
      if (userRSVP) {
        await SeedorfApi.updateRSVPStatus({ gameUUID, rsvpUUID: userRSVP.uuid, status });
      } else {
        await SeedorfApi.setRSVPStatus({ gameUUID, status });
      }
      // Pass event up to parent component
      onRSVPSuccess({ gameUUID });
    } catch (exc) {
      console.log(exc);
      onRSVPError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      updateStatus: this.handleUpdate,
    };

    return children(api);
  }
}

RSVPApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onRSVPError: PropTypes.func,
  onRSVPSuccess: PropTypes.func,
};

RSVPApiCall.defaultProps = {
  onRSVPError: () => {},
  onRSVPSuccess: () => {},
};

export default RSVPApiCall;
