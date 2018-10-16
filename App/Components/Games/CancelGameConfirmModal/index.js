import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import CancelConfirmModal from '../../Common/Modals/CancelConfirmModal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
const Img = styled.Image`
  height: 120px;
  width: 116px;
`;
//------------------------------------------------------------------------------
const Title = styled(Text.M)`
  text-align: center;
`;
//------------------------------------------------------------------------------
const Subtitle = styled(Text.SM)`
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGameConfirmModal = ({ visible, onConfirm, onClose }) => (
  <CancelConfirmModal
    visible={visible}
    onClose={onClose}
    okBtnLabel={I18n.t('Hell yes')}
    cancelBtnLabel={I18n.t('Back')}
    onOk={onConfirm}
    onCancel={onClose}
  >
    <Block>
      <Container>
        <Img source={themeImages.activityCancelledVisual} />
        <Spacer orientation="column" size="L" />
        <Title>{`${I18n.t('Are you 100% sure')}?`}</Title>
        <Spacer orientation="column" size="M" />
        <Subtitle>${I18n.t('All attendees will receive an email with your reason for cancellation')}</Subtitle>
      </Container>
    </Block>
  </CancelConfirmModal>
);

CancelGameConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
};

CancelGameConfirmModal.defaultProps = {
  visible: false,
  onConfirm: () => {},
  onClose: () => {},
};

export default CancelGameConfirmModal;
