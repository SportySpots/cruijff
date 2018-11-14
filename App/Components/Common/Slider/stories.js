import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Block from '../Block';
import Spacer from '../Spacer';
import Slider from '.';

class Container extends React.PureComponent {
  state = { value: this.props.initialValue }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      initialValue, minimumValue, maximumValue, ...rest
    } = this.props;
    const { value } = this.state;
    return (
      <Block>
        <Text>{value}</Text>
        <Spacer size="M" />
        <Slider
          value={value}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          onValueChange={this.handleChange}
          {...rest}
        />
      </Block>
    );
  }
}

Container.propTypes = {
  initialValue: PropTypes.number,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
};

Container.defaultProps = {
  initialValue: 0,
  minimumValue: 0,
  maximumValue: 20,
};

storiesOf('Common.Slider', module)
  .add('Slider default', () => <Container />)
  .add('Slider initialValue 5', () => (
    <Container initialValue={5} />
  ));
