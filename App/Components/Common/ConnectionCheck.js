import React from 'react';
import { View, NetInfo } from 'react-native';
import I18n from '../../I18n';
import Text from './Text';

class ConnectionCheck extends React.Component {
  state = {
    connType: '', // 'none', 'wifi', 'cellular', 'unknown'
  }

  componentWillMount() {
    NetInfo.getConnectionInfo().then().done(() => {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        this.setState({ connType: connectionInfo.type });
      });
    });

    NetInfo.addEventListener('connectionChange', this.handleConnChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnChange);
  }

  handleConnChange = ({ type }) => {
    this.setState({ connType: type });
  }

  render() {
    const { connType } = this.state;

    if (connType !== 'none') {
      return null;
    }

    return (
      <View>
        <Text>{I18n.t('No connection')}</Text>
      </View>
    );
  }
}

export default ConnectionCheck;
