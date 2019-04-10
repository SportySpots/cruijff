import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import SliderWithText from '.';

const StyledView = styled.View`
  height: 180px;
  border: 1px solid black;
`;

class Container extends React.PureComponent {
  constructor(props) {
    super(props);

    const { minimumValue } = props;

    this.state = {
      value: minimumValue,
    };
  }

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
          description={<Text>I&apos;m the description</Text>}
          value={value}
          onValueChange={this.handleChange}
          {...this.props}
        />
      </StyledView>
    );
  }
}

Container.propTypes = {
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
};

Container.defaultProps = {
  minimumValue: 0,
  maximumValue: 20,
};

storiesOf('Common.SliderWithText', module)
  .add('SliderWithText', () => (
    <Container />
  ));
