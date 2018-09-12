import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import SliderWithText from './index';

const StyledView = styled.View`
  height: 180px;
  border: 1px solid black;
`;

class Container extends React.PureComponent {
  state = { value: 2 }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <StyledView>
        <Text>{value}</Text>
        <SliderWithText
          label="I'm the label"
          description="I'm the description"
          value={value}
          onChange={this.handleChange}
        />
      </StyledView>
    );
  }
}

storiesOf('Common.SliderWithText', module)
  .add('SliderWithText', () => (
    <Container />
  ));
