import React from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';

import Text from '../Components/Common/Text';
import DefaultButton from '../Components/Common/DefaultButton';
import navigationPropTypes from '../PropTypesDefinitions/navigation';

import { log } from '../config';

const Container = styled.View`
  flex: 1;
`;

const Line = styled.View`
  margin-bottom: 8px;
`;

class DebugScreen extends React.Component {
  static propTypes = {
    navigation: navigationPropTypes,
  }
  render() {
    return (
      <Container>
        <DefaultButton title="main" text="back" onPress={() => this.props.navigation.navigate('MainNav')} />
        <ScrollView>
          { log.map((item, idx) => {
            const { logTime, ...args } = item;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Line key={idx}>
                <Text.S selectable>{logTime}</Text.S>
                {Object.keys(args).map(innerIdx => (
                  <Text.S key={innerIdx} selectable>{JSON.stringify(args[innerIdx])}</Text.S>
                ))}
              </Line>
            );
          }) }
        </ScrollView>
      </Container>
    );
  }
}

export default DebugScreen;
