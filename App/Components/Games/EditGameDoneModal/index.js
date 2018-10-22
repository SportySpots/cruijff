import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import themeImages from '../../../Themes/Images';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import ConfirmModal from '../../Common/Modals/ConfirmModal';

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
// TODO: probably need to create a component for img, title and subtitle
const EditGameDoneModal = ({ visible, onClose }) => (
  <ConfirmModal
    visible={visible}
    onClose={onClose}
    okBtnLabel={I18n.t('Ok')}
    onOk={onClose}
  >
    <Block>
      <Container>
        <Img source={themeImages.activityCancelledVisual} />
        <Spacer size="L" />
        <Title>{I18n.t('The activity has been updated')}</Title>
        <Spacer size="M" />
        <Subtitle>{I18n.t('All attendees will receive an update email')}</Subtitle>
      </Container>
    </Block>
  </ConfirmModal>
);

EditGameDoneModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

EditGameDoneModal.defaultProps = {
  visible: false,
  onClose: () => {},
};

export default EditGameDoneModal;
