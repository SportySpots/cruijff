import React from 'react';
import PropTypes from 'prop-types';
import FormProps from '../../../RenderProps/form-props';
import RSVPApiCall from '../../../Components/Games/RSVPApiCall';
import RSVPButtons from '../../../Components/Games/RSVPButtons';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RSVP = ({
  gameUUID,
  user,
  userRSVP,
  userStatus,
  onRSVPLoggedOut,
  onRSVPSuccess,
}) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleServerError,
      handleSuccess,
    }) => (
      <RSVPApiCall
        onRSVPError={handleServerError}
        onRSVPSuccess={() => {
          // Extend formProps.handleSuccess' default functionality
          handleSuccess(onRSVPSuccess);
        }}
      >
        {({ updateStatus }) => (
          <RSVPButtons
            gameUUID={gameUUID}
            userRSVP={userRSVP}
            userStatus={userStatus}
            disabled={disabled}
            onBeforeHook={() => {
              // Extend formProps.handleBefore' default functionality
              handleBefore(() => {
                if (!user || !user.uuid) {
                  onRSVPLoggedOut();
                  // Throw error in order to interrupt rsvp normal flow
                  throw new Error(401, 'User not authorized!');
                }
              });
            }}
            onClientCancelHook={handleClientCancel}
            onSuccessHook={(inputFields) => {
              // Call api to store data into DB
              updateStatus(inputFields);
            }}
          />
        )}
      </RSVPApiCall>
    )}
  </FormProps>
);

RSVP.propTypes = {
  gameUUID: PropTypes.string.isRequired,
  user: PropTypes.object, // eslint-disable-line
  userRSVP: PropTypes.object, // eslint-disable-line
  userStatus: PropTypes.oneOf([
    'UNKNOWN',
    'ACCEPTED',
    'ATTENDING',
    'CHECKED_IN',
    'DECLINED',
    'INTERESTED',
    'INVITED',
  ]),
  onRSVPLoggedOut: PropTypes.func,
  onRSVPSuccess: PropTypes.func,
};

RSVP.defaultProps = {
  user: null,
  userRSVP: null,
  userStatus: null,
  onRSVPLoggedOut: () => {},
  onRSVPSuccess: () => {},
};

export default RSVP;
