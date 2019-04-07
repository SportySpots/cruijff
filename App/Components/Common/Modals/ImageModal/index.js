import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../../Text';
import Spacer from '../../Spacer';
import Block from '../../Block';
import ConfirmModal from '../ConfirmModal';
import CancelConfirmModal from '../CancelConfirmModal';

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
// COMPONENT:
//------------------------------------------------------------------------------
const ImageModal = ({
  modalComponent,
  src,
  title,
  subtitle,
  ...rest
}) => {
  const Modal = modalComponent === 'ConfirmModal' ? ConfirmModal : CancelConfirmModal;

  return (
    <Modal {...rest}>
      <Block>
        <Container>
          <Img source={src} />
          <Spacer size="L" />
          <Text size="M" center>
            {title}
          </Text>
          {!!subtitle && subtitle.length > 0 && [
            <Spacer key="spacer" size="M" />,
            <Text key="subtitle" size="SM" center>
              {subtitle}
            </Text>,
          ]}
        </Container>
      </Block>
    </Modal>
  );
};

ImageModal.propTypes = {
  modalComponent: PropTypes.oneOf(['ConfirmModal', 'CancelConfirmModal']).isRequired,
  src: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // Plus all props from ConfirmModalor CancelConfirmModal
};

ImageModal.defaultProps = {
  title: '',
  subtitle: '',
};

export default ImageModal;
