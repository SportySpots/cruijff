import React from 'react';
import PropTypes from 'prop-types';
// import { TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import GET_SPORTS from '../../../GraphQL/Sports/Queries/GET_SPORTS';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Tag from '../../Common/Tag';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterFlap = ({
  maxDistance,
  allSports,
  selectedSportIds,
  // onClose,
}) => (
  <Query query={GET_SPORTS}>
    {({ loading, error, data }) => {
      if (loading || error || !data || !data.sports) {
        return null;
      }

      // console.log('DATA.SPORTS', data.sports);
      // console.log('SELECTED_SPORT_IDS', selectedSportIds);

      return (
        <Row alignItems="center">
          <Text.M>{`${I18n.t('Filter')} :`}</Text.M>
          <Spacer row size="M" />
          <FlexOne>
            <Row>
              <Tag value={`< ${maxDistance.toFixed(1).toString().replace('.0', '')}km`} status="warning" />
              <Spacer row size="M" />
              {allSports ? (
                <Tag value={I18n.t('All sports')} status="success" />
              ) : (
                selectedSportIds.map((sportId, index) => [
                  <Tag
                    key="tag"
                    value={I18n.t(data.sports.find(sport => sport.id === sportId).category)}
                    status="success"
                  />,
                  // Don't add spacer in case it's the last item
                  index !== selectedSportIds.length - 1 && (
                    <Spacer key="spacer" row size="M" />
                  ),
                ])
              )}
            </Row>
          </FlexOne>
          {/* <TouchableOpacity onPress={onClose}>
            <Icon size={24} name="close" color="black" />
              </TouchableOpacity> */}
        </Row>
      );
    }}
  </Query>
);

SpotsFilterFlap.propTypes = {
  maxDistance: PropTypes.number,
  allSports: PropTypes.bool,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string),
  // onClose: PropTypes.func,
};

SpotsFilterFlap.defaultProps = {
  maxDistance: 20,
  allSports: true,
  selectedSportIds: [],
  // onClose: () => {},
};

export default SpotsFilterFlap;
