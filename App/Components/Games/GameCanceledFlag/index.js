import React from 'react';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Row from '../../Common/Row';
import Text from '../../Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Inner = styled.View`
  background-color: ${({ theme }) => theme.colors.negative};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  padding: 8px 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameCanceledFlag = () => (
  <Row justifyContent="flex-end">
    <Inner>
      <Text size="M" color="white">
        {I18n.t('gameCanceledFlag.text')}
      </Text>
    </Inner>
  </Row>
);

export default GameCanceledFlag;
