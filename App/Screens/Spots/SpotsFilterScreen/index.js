import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import SpotsFilterActionCall from '../../../Components/Spots/SpotsFilterActionCall';
import SpotsFilterForm from '../../../Components/Spots/SpotsFilterForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterScreen = ({
  navigation,
  maxDistance,
  allSports,
  selectedSportIds,
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
            <SpotsFilterActionCall
              onFilterSuccess={() => {
                // Extend formProps.handleSuccess' default functionality
                handleSuccess(() => {
                  // Go back to spots screen
                  navigation.goBack(null);
                });
              }}
            >
              {({ filterSpots }) => (
                <SpotsFilterForm
                  sports={data.sports}
                  maxDistance={maxDistance}
                  allSports={allSports}
                  selectedSportIds={selectedSportIds}
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onClientCancelHook={handleClientCancel}
                  // Call actions to update redux store
                  onSuccessHook={filterSpots}
                />
              )}
            </SpotsFilterActionCall>
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
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ spotFilters }) => (spotFilters);
const withRedux = connect(mapStateToProps, null);

export default withRedux(SpotsFilterScreen);
