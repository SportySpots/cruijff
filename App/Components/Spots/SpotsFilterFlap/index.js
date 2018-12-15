import React from 'react';
import PropTypes from 'prop-types';
// import { TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import I18n from '../../../I18n';
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
      const tags = [{
        index: 'distance',
        value: `< ${maxDistance.toFixed(1).toString().replace('.0', '')}km`,
        status: 'warning', // 'success'
      }];

      if (allSports) {
        tags.push({
          index: 'all-sports',
          value: I18n.t('spotsFilterFlap.allSports'),
          status: 'success',
        });
      } else {
        selectedSportIds.forEach((sportId) => {
          tags.push({
            index: sportId,
            value: I18n.t(data.sports.find(sport => sport.id === sportId).category),
            status: 'success',
          });
        });
      }

      return (
        <Row alignItems="center">
          <Text.M>{`${I18n.t('spotsFilterFlap.label')} :`}</Text.M>
          <Spacer row size="M" />
          <FlexOne>
            <FlatList
              horizontal
              keyExtractor={item => item.index}
              data={tags}
              renderItem={({ item }) => (
                <Tag
                  value={item.value}
                  status={item.status}
                  // reverse
                />
              )}
              ItemSeparatorComponent={() => <Spacer key="spacer" row size="M" />}
            />
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
