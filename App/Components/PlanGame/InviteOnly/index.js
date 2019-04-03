import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
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
      <Text size="ML" color="white">
        {I18n.t('inviteOnly.checkboxLabel')}
      </Text>
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
