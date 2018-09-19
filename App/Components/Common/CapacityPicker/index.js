import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from '../Text';
import Block from '../Block';
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
// COMPONENT:
//------------------------------------------------------------------------------
const CapacityPicker = ({
  value,
  onBtnPress,
  onIncrease,
  onDecrease,
}) => (
  <View style={{ borderWidth: 1, borderColor: 'green' }}>
    {BUTTONS.map(({ row, labels }) => [
      <Row
        key={row}
        justifyContent="space-between"
      >
        {labels.map(label => (
          <RaisedButton
            key={label}
            label={label}
            status={value === label ? 'primary' : 'ghost'}
            size="M"
            width={80}
            onPress={() => { onBtnPress(label); }}
          />
        ))
      }
      </Row>,
      <Spacer
        key={`spacer-${row}`}
        orientation="column"
        size="L"
      />,
    ])}
    <Spacer orientation="column" size="L" />
    <Block>
      <Row justifyContent="space-between">
        <RoundButton
          status="dark"
          iconName="minus"
          onPress={onDecrease}
        />
        <Text.XL>{value || 0}</Text.XL>
        <RoundButton
          status="dark"
          iconName="plus"
          onPress={onIncrease}
        />
      </Row>
    </Block>
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
