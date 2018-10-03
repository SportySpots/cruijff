import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Checkbox from '../../Common/Checkbox';
import Row from '../../Common/Row';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Label = styled(Text.M)`
  color: ${Colors.white};
`;

/* inviteOnly: {
  flexDirection: 'row',
  alignItems: 'center',
},
inviteOnlyText: {
  color: Colors.white,
  fontSize: 24,
},
inviteOnlyTextContainer: {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
}, */
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
const InviteOnly = ({ link }) => (
  <Row alignItems="center">
    <Checkbox
      color={Colors.white}
      checked={!this.props.gameDetails.isPublic}
      onPress={() =>
        this.props.setGameDetailField('isPublic', !this.props.gameDetails.isPublic)
      }
      size={72}
    />
    <Label>{I18n.t('This event is invite-only')}</Label>
  </Row>
);

InviteOnly.propTypes = {
  link: PropTypes.string.isRequired,
};

export default InviteOnly;
