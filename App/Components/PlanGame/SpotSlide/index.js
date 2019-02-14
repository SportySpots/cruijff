import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import cloneDeep from 'lodash/cloneDeep';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

// TODO: update I18n names
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  spot: null,
};

export const INIT_ERRORS = {};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably move maxDistance to SpotsList and get said value from context
class SpotSlide extends React.PureComponent {
  render() {
    const { sport, spot, onChange } = this.props;

    return [
      <Spacer key="spacer" size="XL" />,
      <SpotsList
        key="spots"
        cardComponent="SpotListCardSmall"
        sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
        // maxDistance={maxDistance} // km
        selectedSpot={spot}
        onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
      />,
    ];
  }
}

SpotSlide.title = 'planGameScreen.spotSlide.title'; // TODO: update using slide namespace
SpotSlide.requiredFields = ['spot'];
SpotSlide.nextBtnLabel = 'planGameScreen.spotSlide.footer.nextBtnLabel';

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
