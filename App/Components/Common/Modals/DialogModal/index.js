import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
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
const Flex = styled.View`
  display: flex;
`;
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
    <Flex>
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
    </Flex>
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView } from 'react-native';
import styled from 'styled-components';
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
const Flex = styled.View`
  display: flex;
`;
//------------------------------------------------------------------------------
const Body = styled.View`
  flex-grow: 1; /* take all remaining height /
  `;
  //------------------------------------------------------------------------------
  const Footer = styled.View`
    padding: 8px;
  `;
  //------------------------------------------------------------------------------
  const StyledScrollView = styled(ScrollView)`
    max-height: ${({ bodyHeight }) => (
      bodyHeight ? Math.min(bodyHeight, MAX_BODY_HEIGHT) : MAX_BODY_HEIGHT
    )}px;
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
      <Flex>
        {header && (
          <Block>
            {header}
          </Block>
        )}
        <StyledScrollView bodyHeight={bodyHeight}>
          <Body>
            {children}
          </Body>
        </StyledScrollView>
        {footer && [
          <Divider key="divider" />,
          <Footer key="footer">
            {footer}
          </Footer>,
        ]}
      </Flex>
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

*/
