import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import Row from '../Row';
import Text from '../Text';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const HEIGHT = 50;
const TOP_PADDING = 20;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Relative = styled.View`
  height: ${HEIGHT}px;
  position: relative;
  margin: 0;
`;
//------------------------------------------------------------------------------
const AbsoluteRowHead = styled(Row)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
//------------------------------------------------------------------------------
const Head = styled(Block)`
  background-color: ${Colors.white};
  border: 1px solid ${Colors.silver};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const AbsoluteRectangle = styled.View`
  position: absolute;
  top: ${HEIGHT - TOP_PADDING};
  left: 0;
  right: 0;
  background-color: ${Colors.white};
  border-top-width: 1px;
  border-top-color: ${Colors.silver};
  height: ${TOP_PADDING};
`;
//------------------------------------------------------------------------------
const AbsoluteRowTitle = styled(Row)`
  position: absolute;
  top: ${TOP_PADDING};
  left: 0;
  right: 0;
  text-align: center;
`;
//------------------------------------------------------------------------------
const WhiteBg = styled.View`
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Flap = ({ title, width }) => (
  <Relative>
    <AbsoluteRowHead
      justifyContent="center"
      alignItems="center"
    >
      <Head midHeight style={{ height: HEIGHT, width }} />
    </AbsoluteRowHead>

    <AbsoluteRectangle />

    <AbsoluteRowTitle
      justifyContent="center"
      alignItems="center"
    >
      <WhiteBg style={{ width: width - 3 }}>
        <Text.M style={{ textAlign: 'center' }}>
          {title}
        </Text.M>
      </WhiteBg>
    </AbsoluteRowTitle>
  </Relative>
);

Flap.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

Flap.defaultProps = {
  title: '',
  width: 200,
};

export default Flap;
