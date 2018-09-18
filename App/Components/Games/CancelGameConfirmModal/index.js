import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import Text from '../../../Components/Common/Text';
import Spacer from '../../../Components/Common/Spacer';
import CancelConfirmModal from '../../Common/Modals/CancelConfirmModal';

//------------------------------------------------------------------------------
// STYLE:
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
    <Img source={themeImages.activityCancelledVisual} />
    <Spacer orientation="column" size="L" />
<<<<<<< HEAD
    <Centered>{`${I18n.t('The activity is cancelled')}.`}</Centered>
  </ConfirmModal>
=======
    <Title>{`${I18n.t('Are you 100% sure')}?`}</Title>
    <Spacer orientation="column" size="M" />
    <Subtitle>{`${I18n.t('All attendees will receive an email with your reason for cancellation')}.`}</Subtitle>
  </CancelConfirmModal>
>>>>>>> 9a98bfe24971138c9f6591a34aa43555571f42b2
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
