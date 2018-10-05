import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import SpotsFilter from '../../../Components/Spots/SpotsFilter';

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
      // errorMsg,
      // successMsg,
      handleBefore,
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
            <SpotsFilter
              sports={data.sports}
              maxDistance={maxDistance}
              allSports={allSports}
              selectedSportIds={selectedSportIds}
              // Form props
              disabled={disabled}
              onBeforeHook={handleBefore}
              onSuccessHook={() => {
                // Extend FormProps.handleSuccess default functionality
                handleSuccess(() => {
                  // Go back to spots screen
                  navigation.goBack(null);
                });
              }}
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
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ spotFilters }) => (spotFilters);
const withRedux = connect(mapStateToProps, null);

export default withRedux(SpotsFilterScreen);
