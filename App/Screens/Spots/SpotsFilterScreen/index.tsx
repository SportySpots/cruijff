import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import SpotsFilterForm from '../../../Components/Spots/SpotsFilterForm';
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterScreen = ({
  navigation,
}) => (
  <FormProps>
    {({
      disabled,
      handleBefore,
      handleClientCancel,
      handleSuccess,
    }) => (
      <Query query={GET_SPORTS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <CenteredActivityIndicator />;
          }
          if (error || !data || !data.sports) {
            return null;
          }

          return (
              <SpotsFilterForm
                sports={data.sports}
                disabled={disabled}
              />
          );
        }}
      </Query>
    )}
  </FormProps>
);

SpotsFilterScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SpotsFilterScreen;
