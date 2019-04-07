import { storiesOf } from '@storybook/react-native';
import React from 'react';
import NotificationPermissionSlide, { NOTIFICATION_PERMISSION } from '.';

class Container extends React.PureComponent {
  state = {
    notificationPermission: NOTIFICATION_PERMISSION.UNDEFINED,
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) { return; }
    this.setState({ [fieldName]: value });
  }

  render() {
    const { notificationPermission } = this.state;

    return (
      <NotificationPermissionSlide
        notificationPermission={notificationPermission}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('Onboarding.NotificationPermissionSlide', module)
  .add('NotificationPermissionSlide', () => <Container />);
