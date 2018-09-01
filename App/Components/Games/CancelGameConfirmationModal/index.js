import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Text from '../../../Components/Common/Text';
import Modal from '../../../Components/Common/Modal';

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
const Spacer = styled.View`
  height: 20px;
`;
//------------------------------------------------------------------------------
const Centered = styled(Text.M)`
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGameConfirmationModal = ({ visible, onClose }) => (
  <Modal
    visible={visible}
    onClose={onClose}
  >
    <Img source={{ uri: 'https://via.placeholder.com/150x150' }} />
    <Spacer />
    <Centered>{`${I18n.t('The activity is cancelled')}.`}</Centered>
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Text from '../../../Components/Common/Text';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledModal = styled(Modal)`
  border: 1px solid green;
`;
//------------------------------------------------------------------------------
const Overlay = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
  margin: 36px;
  padding: 16px;
  border-radius: 8px;
`;
//------------------------------------------------------------------------------
const Img = styled.Image`
  margin: 0 auto;
  height: 150px;
  width: 150px;
  border-radius: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGameConfirmationModal = ({ visible, onClose }) => (
  <StyledModal
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
    transparent
  >
    <Overlay>
      <Flex>
        <View>
          <Img source={{ uri: 'https://via.placeholder.com/150x150' }} />
          <Text.L>{I18n.t('Select a date')}</Text.L>
        </View>
      </Flex>
    </Overlay>
  </StyledModal>
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

*/