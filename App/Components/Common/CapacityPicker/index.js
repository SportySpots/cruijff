import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
// STYLE:
//------------------------------------------------------------------------------
const FullWidth = styled.View`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CapacityPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0,
    };
  }

  handlePress = (value) => {
    const { onChange } = this.props;

    this.setState(
      { value },
      // Pass event up to parent component
      () => { onChange(this.state.value); },
    );
  }

  increase = () => {
    const { onChange } = this.props;
    const { value } = this.state;

    this.setState(
      { value: value + 1 },
      // Pass event up to parent component
      () => { onChange(this.state.value); },
    );
  }

  decrease = () => {
    const { onChange } = this.props;
    const { value } = this.state;

    this.setState(
      { value: value > 0 ? value - 1 : 0 },
      // Pass event up to parent component
      () => { onChange(this.state.value); },
    );
  }

  render() {
    const { value } = this.state;

    return (
      <FullWidth>
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
                onPress={() => { this.handlePress(label); }}
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
              onPress={this.decrease}
            />
            <Text.XL>{value}</Text.XL>
            <RoundButton
              status="dark"
              iconName="plus"
              onPress={this.increase}
            />
          </Row>
        </Block>
      </FullWidth>
    );
  }
}

CapacityPicker.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

CapacityPicker.defaultProps = {
  value: 0,
  onChange: () => {},
};

export default CapacityPicker;
