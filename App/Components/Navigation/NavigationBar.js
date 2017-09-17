import React, { Component } from 'react';
import {BottomNavigation} from 'react-native-material-ui';

export default class NavigationBar extends Component {
  constructor() {
    super();

    this.state = {
      active: 'today',
    };
  }

  render() {
    return (
      <BottomNavigation active={this.state.active} hidden={false}>
        <BottomNavigation.Action key="today" icon="today" label="Today" onPress={() => this.setState({active: 'today'})}/>
        <BottomNavigation.Action key="people" icon="people" label="People" onPress={() => this.setState({active: 'people'})}/>
        <BottomNavigation.Action key="bookmark-border" icon="bookmark-border" label="Bookmark" onPress={() => this.setState({active: 'bookmark-border'})}/>
        <BottomNavigation.Action key="settings" icon="settings" label="Settings" onPress={() => this.setState({active: 'settings'})}/>
      </BottomNavigation>
    )
  }
}
