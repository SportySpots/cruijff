import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import Dropdown from '.';

const data = [
  {
    label: 'Banana', value: 'banana',
  },
  {
    label: 'Mango', value: 'mango',
  },
  {
    label: 'Pear', value: 'pear',
  },
];

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = ({ value }) => {
    this.setState(
      { value },
      () => { console.log(this.state); },
    );
  }

  render() {
    const {
      bgColor,
      theme,
      size,
      error,
    } = this.props;
    const { value } = this.state;

    return (
      <Block bgColor={bgColor}>
        <Text>{value}</Text>
        <Dropdown
          theme={theme}
          size={size}
          label="I'm the label"
          data={data}
          onChangeText={this.handleChange}
          error={error}
        />
      </Block>
    );
  }
}

Container.propTypes = {
  bgColor: PropTypes.string,
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  error: PropTypes.string,
};

Container.defaultProps = {
  bgColor: 'white',
  theme: 'black',
  size: 'M',
  error: '',
};

storiesOf('Common.Dropdown', module)
  .add('Dropdown', () => <Container />)
  .add('Dropdown with error', () => (
    <Container error="Some error msg" />
  ))
  .add('Dropdown with white theme', () => (
    <Container
      bgColor={Colors.primaryGreen}
      theme="white"
      error="Some error msg"
    />
  ))
  .add('Dropdown with white theme size L', () => (
    <Container
      bgColor={Colors.primaryGreen}
      theme="white"
      error="Some error msg"
      size="L"
    />
  ));
