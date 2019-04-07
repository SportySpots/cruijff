import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import SwitchWithText from '.';

const StyledView = styled.View`
  height: 180px;
  border: 1px solid black;
`;

class Container extends React.PureComponent {
  state = { value: false }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <StyledView>
        <Text>{value.toString()}</Text>
        <SwitchWithText
          label="I'm the label"
          description="I'm the description"
          value={value}
          onChange={this.handleChange}
        />
      </StyledView>
    );
  }
}

storiesOf('Common.SwitchWithText', module)
  .add('SwitchWithText', () => (
    <Container />
  ));
