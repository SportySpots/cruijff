import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import Text from '../Text';
import Row from '../Row';
import Spacer from '../Spacer';
import RaisedButton from '../RaisedButton';
import RoundButton from '../RoundButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const BUTTONS = [
  { row: 0, labels: [2, 4, 6] },
  { row: 1, labels: [9, 10, 12] },
  { row: 2, labels: [14, 16, 22] },
];
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Counter = styled(Text.XL)`
  flex-grow: 1;
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CapacityPicker = ({
  value,
  onBtnPress,
  onIncrease,
  onDecrease,
}) => (
  <View>
    {BUTTONS.map(({ row, labels }) => [
      <Row
        key={row}
        justifyContent="space-between"
      >
        {labels.map(label => (
          <RaisedButton
            key={label}
            label={label}
            variant={value === label ? 'primary' : 'ghost'}
            size="M"
            width={80}
            onPress={() => { onBtnPress(label); }}
          />
        ))
      }
      </Row>,
      <Spacer
        key={`spacer-${row}`}
        size="L"
      />,
    ])}
    <Spacer size="L" />
    <Row>
      <Spacer row size="L" />
      <RoundButton
        testID="capacityMinus"
        status="dark"
        iconName="minus"
        onPress={onDecrease}
      />
      <Counter>{value || 0}</Counter>
      <RoundButton
        testID="capacityPlus"
        status="dark"
        iconName="plus"
        onPress={onIncrease}
      />
      <Spacer row size="L" />
    </Row>
  </View>
);

CapacityPicker.propTypes = {
  value: PropTypes.number,
  onBtnPress: PropTypes.func,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

CapacityPicker.defaultProps = {
  value: 0,
  onBtnPress: () => {},
  onIncrease: () => {},
  onDecrease: () => {},
};

export default CapacityPicker;
