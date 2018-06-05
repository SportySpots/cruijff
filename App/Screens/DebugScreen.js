import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';

import Text from '../Components/Text';
import DefaultButton from '../Components/DefaultButton';
import { navigation as navigationPropType } from '../PropTypesDefinitions/navigation';

import { log } from '../config';

const Container = styled.View`
  flex: 1;
`;

const Line = styled.View`
  margin-bottom: 8px;
`;

class DebugScreen extends React.Component {
  static propTypes = {
    navigation: navigationPropType,
  }
  render() {
    return (
      <Container>
        <DefaultButton title="main" text="back" onPress={() => this.props.navigation.navigate('MainNav')} />
        <ScrollView>
          { log.map((item, idx) => {
            const { logTime, ...args } = item;
            // eslint-disable-next-line react/no-array-index-key
            return <Line key={idx}><Text.S>{logTime} {JSON.stringify(args)}</Text.S></Line>;
          }) }
        </ScrollView>
      </Container>
    );
  }
}

export default DebugScreen;
