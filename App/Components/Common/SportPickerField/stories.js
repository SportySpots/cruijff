import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import SportPickerField from './index';

class Container extends React.PureComponent {
  state = { sport: null }

  handleChange = (sport) => {
    this.setState({ sport });
  }

  render() {
    const {
      theme,
      label,
      boxed,
      size,
    } = this.props;
    const { sport } = this.state;

    return (
      <SportPickerField
        theme={theme}
        label={label}
        boxed={boxed}
        value={sport}
        onChange={this.handleChange}
        size={size}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  label: PropTypes.string,
  boxed: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  boxed: false,
};

storiesOf('Common.SportPickerField', module)
  .add('SportPickerField', () => <Container />)
  .add('SportPickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ))
  .add('SportPickerField boxed size ML', () => (
    <Container
      label="I'm the label"
      boxed
      size="ML"
      dateFormat="DD/MM/YYYY"
    />
  ));
