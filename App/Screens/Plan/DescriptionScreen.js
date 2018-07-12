import PropTypes from 'prop-types';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Keyboard, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Footer from '../../Components/DarkFooter/index';
import Text from '../../Components/Text';
import I18n from '../../I18n/index';
import api from '../../Services/SeedorfApi';
import Colors from '../../Themes/Colors';
import { client } from '../../GraphQL/index';

export default class Description extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = { description: '' };
  }

  async componentWillMount() {
    try {
      const result = await client.query({
        query: gql`
          {
            game(uuid: "${this.props.navigation.state.params.uuid}") {
              uuid
              description
            }
          }
        `,
      });

      console.log('result', result);

      const description = (
        result &&
        result.data &&
        result.data.game &&
        result.data.game.description
      ) || '';

      this.setState({ description });

      console.log('description', description);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this._input && this._input.focus();
  }

  onNext = async () => {
    Keyboard.dismiss();
    const result = await api.setGameDescription({
      gameUUID: this.props.navigation.state.params.uuid,
      description: this.state.description,
    });
    if (result.ok) {
      this.props.navigation.navigate('created', {
        uuid: this.props.navigation.state.params.uuid,
      });
    }
  };

  onBack = () => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
  };

  render() {
    const { description } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text.L style={styles.title}>{I18n.t('Describe the game')}</Text.L>
          <TextInput
            style={styles.input}
            multiline
            maxLength={120}
            placeholderTextColor={Colors.white}
            selectionColor={Colors.white}
            underlineColorAndroid={Colors.white}
            onChangeText={text => this.setState({ description: text })}
            ref={(elm) => { this._input = elm; }}
            value={description}
          />
        </ScrollView>
        <Footer
          numPages={4}
          currentPage={2}
          onBack={this.onBack}
          onNext={this.onNext}
          disableNext={!this.state.description}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 32,
  },
  title: {
    color: Colors.white,
  },
  input: {
    color: Colors.white,
  },
});
