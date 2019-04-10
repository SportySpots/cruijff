import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import Block from '../../Common/Block';
import SportDateTimeSlide, { INIT_STATE, INIT_ERRORS } from '.';

class Container extends React.PureComponent {
  state = {
    ...cloneDeep(INIT_STATE),
    errors: cloneDeep(INIT_ERRORS),
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { theme } = this.props;

    return (
      <SportDateTimeSlide
        theme={theme}
        onChange={this.handleChange}
        {...this.state}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
};

Container.defaultProps = {
  theme: 'black',
};

storiesOf('PlanGame.SportDateTimeSlide', module)
  .add('SportDateTimeSlide white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ));
