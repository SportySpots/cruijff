import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import Checkbox from '../../Common/Checkbox';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const StyledRow = styled(Row)`
  flex: 1;
  flex-wrap: wrap;
`;
// -----------------------------------------------------------------------------
const Label = styled(Text.ML)`
  color: ${Colors.white};
`;
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
const InviteOnly = ({ isPublic, onPress }) => (
  <Row alignItems="center">
    <Checkbox
      theme="white"
      checked={!isPublic}
      onPress={() => { onPress(!isPublic); }}
    />
    <Spacer row size="L" />
    <StyledRow>
      <Label>{I18n.t('inviteOnly.checkboxLabel')}</Label>
    </StyledRow>
  </Row>
);

InviteOnly.propTypes = {
  isPublic: PropTypes.bool,
  onPress: PropTypes.func,
};

InviteOnly.defaultProps = {
  isPublic: true,
  onPress: () => {},
};

export default InviteOnly;
