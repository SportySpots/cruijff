import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import Text from '../../../Components/Common/Text';
import Spacer from '../../../Components/Common/Spacer';
import ConfirmModal from '../../Common/Modals/ConfirmModal';

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
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGameDoneModal = ({ visible, onClose }) => (
  <ConfirmModal
    visible={visible}
    onClose={onClose}
    okBtnLabel={I18n.t('Ok')}
    onOk={onClose}
  >
    <Img source={themeImages.activityCancelledVisual} />
    <Spacer orientation="column" size="L" />
    <Title>{`${I18n.t('The activity is cancelled')}.`}</Title>
  </ConfirmModal>
);

CancelGameDoneModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

CancelGameDoneModal.defaultProps = {
  visible: false,
  onClose: () => {},
};

export default CancelGameDoneModal;
