import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import SportPickerField from '.';

class Container extends React.PureComponent {
  state = { sport: null }

  handleChange = (sport) => {
    this.setState({ sport });
  }

  render() {
    const {
      theme,
      label,
      fullWidth,
      size,
    } = this.props;
    const { sport } = this.state;

    return (
      <SportPickerField
        theme={theme}
        label={label}
        fullWidth={fullWidth}
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
  fullWidth: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  fullWidth: false,
};

storiesOf('Common.SportPickerField', module)
  .add('SportPickerField', () => <Container />)
  .add('SportPickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('SportPickerField fullWidth size ML', () => (
    <Container
      label="I'm the label"
      fullWidth
      size="ML"
      dateFormat="DD/MM/YYYY"
    />
  ));
