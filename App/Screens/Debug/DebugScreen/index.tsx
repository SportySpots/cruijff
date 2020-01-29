import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from 'App/Themes/Colors';
import Block from 'App/Components/Common/Block';
import Spacer from 'App/Components/Common/Spacer';
import Text from 'App/Components/Common/Text';
import RaisedButton from 'App/Components/Common/RaisedButton';
import { observer } from "mobx-react";
import { log } from "App/Stores/Log";
import { NavigationScreenProps } from "react-navigation";


interface ExpandableTextProps {
  text: string;
  expandedText: string;
}
const ExpandableText = ({text, expandedText}: ExpandableTextProps) => {
  const [isExpanded, setExpanded] = React.useState<boolean>(false);
  const innerText = text + (
    expandedText
      ? (isExpanded ? ' (Collapse)' : ' (Expand)')
      : ''
  )
  return (
    <TouchableWithoutFeedback onPress={expandedText ? () => setExpanded(!isExpanded) : ()=>null}>
      <View style={{marginTop: 5, marginBottom: 5}}>
        <Text size="S">{innerText}</Text>
        { isExpanded && (
          <Text size="S">
            {expandedText}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
type DebugScreenProps = NavigationScreenProps
const DebugScreen = ({ navigation }: DebugScreenProps) => (
  <ScrollView
    contentContainerStyle={{
      backgroundColor: Colors.white,
    }}
  >
    <Block>
      <RaisedButton
        variant="default"
        label="Back"
        onPress={() => { navigation.navigate('MainNav'); }}
      />
      <RaisedButton
        variant="default"
        label="Clear local storage"
        onPress={() => { AsyncStorage.clear(); }}
      />
      <Spacer size="M" />
        {log.entries.map((entry, index) => {
          let dataAsText = ''
          if (entry.data) {
            try {
              dataAsText = JSON.stringify(entry.data)
            } catch {
              dataAsText = '[Data not serializable]'
            }
          }
          const text = `${Math.floor(entry.timestamp/1000)} [${entry.level}] ${entry.message}`
          return (
            <ExpandableText key={index} text={text} expandedText={dataAsText}/>
          )
        })}
    </Block>
  </ScrollView>
);

export default observer(DebugScreen);
