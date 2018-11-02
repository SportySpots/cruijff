import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
const ImageModal = ({
  modalComponent,
  src,
  title,
  subtitle,
  ...rest
}) => {
  console.log('MODAL_COMP', modalComponent);
  const Modal = modalComponent === 'ConfirmModal' ? ConfirmModal : CancelConfirmModal;

  return (
    <Modal {...rest}>
      <Block>
        <Container>
          <Img source={src} />
          <Spacer size="L" />
          <Title>{title}</Title>
          {!!subtitle && subtitle.length > 0 && [
            <Spacer key="spacer" size="M" />,
            <Subtitle key="subtitle">{subtitle}</Subtitle>,
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
