import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import Divider from '../../Divider';
import Block from '../../Block';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { height: deviceHeight } = Dimensions.get('window');
const MARGIN = 48;
const MAX_BODY_HEIGHT = deviceHeight - (4 * MARGIN);
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Body = styled.View`
  max-height: ${({ height }) => (height ? Math.min(height, MAX_BODY_HEIGHT) : MAX_BODY_HEIGHT)}px;
`;
//------------------------------------------------------------------------------
const Footer = styled.View`
  padding: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DialogModal = ({
  header,
  children,
  footer,
  bodyHeight,
  ...rest
}) => (
  <Modal {...rest}>
    <View>
      {header && (
        <Block>
          {header}
        </Block>
      )}
      <Body height={bodyHeight}>
        {children}
      </Body>
      {footer && [
        <Divider key="divider" />,
        <Footer key="footer">
          {footer}
        </Footer>,
      ]}
    </View>
  </Modal>
);

DialogModal.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  bodyHeight: PropTypes.number,
  // Plus all props from native modal and Modal
};

DialogModal.defaultProps = {
  header: null,
  footer: null,
  bodyHeight: null,
};

export default DialogModal;
