import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import Colors from '../../../Themes/Colors';
import Text from '../../../Components/Common/Text';
import Spacer from '../../../Components/Common/Spacer';
import Modal from '../../../Components/Common/Modal';
import DefaultButton from '../../../Components/Common/DefaultButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Img = styled.Image`
  margin: 0 auto;
  height: 150px;
  width: 150px;
  border-radius: 8px;
`;
//------------------------------------------------------------------------------
const Centered = styled(Text.M)`
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGameConfirmationModal = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose}>
    <Img
      source={themeImages.activityCancelledVisual}
      style={{ width: 130, height: 130 }}
    />
    <Spacer size="L" />
    <Centered>{`${I18n.t('The activity is cancelled')}.`}</Centered>
    <Spacer size="M" />
    <DefaultButton
      style={{ width: 120, margin: 0 }}
      bgColor={Colors.actionYellow}
      textColor={Colors.white}
      text={I18n.t('OK')}
      onPress={onClose}
    />
  </Modal>
);

CancelGameConfirmationModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

CancelGameConfirmationModal.defaultProps = {
  visible: false,
  onClose: () => {},
};

export default CancelGameConfirmationModal;
