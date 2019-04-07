import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Fonts from '../../../Themes/Fonts';
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
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
//------------------------------------------------------------------------------
const AbsoluteRectangle = styled.View`
  position: absolute;
  top: ${HEIGHT - TOP_PADDING};
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.silver};
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
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: add 'size' prop
const Flap = ({ title }) => {
  // Determine flap based on title length (32 = padding)
  const fontWidth = Fonts.M.fontSize * 0.43;
  const width = title.length * fontWidth + 2 * 32;

  return (
    <Relative>
      <AbsoluteRowHead
        justifyContent="center"
        alignItems="center"
      >
        <Head
          midHeight
          bgColor="white"
          style={{ height: HEIGHT, width }}
        />
      </AbsoluteRowHead>

      <AbsoluteRectangle />

      <AbsoluteRowTitle
        justifyContent="center"
        alignItems="center"
      >
        <WhiteBg style={{ width: width - 3 }}>
          <Text size="M" center>
            {title}
          </Text>
        </WhiteBg>
      </AbsoluteRowTitle>
    </Relative>
  );
};

Flap.propTypes = {
  title: PropTypes.string,
};

Flap.defaultProps = {
  title: '',
};

export default Flap;
