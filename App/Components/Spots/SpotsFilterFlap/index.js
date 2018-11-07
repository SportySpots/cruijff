import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Tag from '../../Common/Tag';
import HeaderBtn from '../../Common/HeaderBtn';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Flap = styled(Block)`
  border: 1px solid ${Colors.gray};
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterFlap = ({ maxDistance, allSports, selectedSportIds }) => (
  <Flap bgColor={Colors.white}>
    <Row>
      <Text>{`${I18n.t('Filter')}:`}</Text>
      <Spacer row size="S" />
      <FlexOne>
        <Tag text={`< ${maxDistance.toString()}km`} status="warning" />
      </FlexOne>
      <HeaderBtn iconName="close" />
    </Row>
  </Flap>
);

SpotsFilterFlap.propTypes = {
  ...spotFiltersPropTypes,
};

export default withSpotFilters(SpotsFilterFlap);
