import React from 'react';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  background-color: ${Colors.negative};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  padding: 8px 16px;
`;
//------------------------------------------------------------------------------
const WhiteText = styled(Text.M)`
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameCanceledFlag = () => (
  <Outer>
    <Inner>
      <WhiteText>{I18n.t('Canceled')}</WhiteText>
    </Inner>
  </Outer>
);

export default GameCanceledFlag;
