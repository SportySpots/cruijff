import { storiesOf } from '@storybook/react-native';
import React from 'react';
import LocationSlide from '.';

class Container extends React.PureComponent {
  state = {
    location: null,
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) { return; }
    this.setState({ [fieldName]: value });
  }

  render() {
    const { location } = this.state;

    return (
      <LocationSlide
        location={location}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('Onboarding.LocationSlide', module)
  .add('LocationSlide', () => <Container />);
