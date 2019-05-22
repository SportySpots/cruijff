import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import I18n from '../../../I18n';
import Block from '../Block';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: need to be updated using NetInfo from react-native-community
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
      <Block
        midHeight
        bgColor="black"
      >
        <Text color="white" center>
          {I18n.t('connectionCheck.noConnection')}
        </Text>
      </Block>
    );
  }
}

export default ConnectionCheck;
