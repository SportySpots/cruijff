import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import cloneDeep from 'lodash/cloneDeep';
import styled from 'styled-components';
import { compose } from 'react-apollo';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';
import locationStore from 'App/Stores/Location';
import { observer } from "mobx-react";

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  spot: null,
};

export const INIT_ERRORS = {};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably move maxDistance to SpotsList and get said value from context
@observer
class SpotSlide extends React.PureComponent {
  render() {
    const {
      sport, spot, onChange,
    } = this.props;

    return (
      <FlexOne>
        <Spacer size="XL" />
        <SpotsList
          testID="pickSpot"
          cardComponent="SpotListCardSmall"
          sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
          // maxDistance={maxDistance} // km
          coords={locationStore.locationMapCoords}
          selectedSpot={spot}
          onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
        />
      </FlexOne>
    );
  }
}

SpotSlide.title = 'spotSlide.title';
SpotSlide.requiredFields = ['spot'];
SpotSlide.nextBtnLabel = 'spotSlide.footer.nextBtnLabel';

SpotSlide.propTypes = {
  sport: propType(sportFragment),
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotSlide.defaultProps = {
  sport: null,
  ...cloneDeep(INIT_STATE),
  onChange: () => {},
};

export default SpotSlide;
