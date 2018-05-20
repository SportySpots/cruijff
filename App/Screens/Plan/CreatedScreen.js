import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Clipboard, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Checkbox from '../../Components/Checkbox';
import Footer from '../../Components/DarkFooter/index';
import Text from '../../Components/Text';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';

export default class Created extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    navigation: PropTypes.any,
    setGameDetailField: PropTypes.func,
    gameDetails: PropTypes.shape({
      sport: PropTypes.string,
      date: PropTypes.string,
      startTime: PropTypes.string,
      stopTime: PropTypes.string,
      spotId: PropTypes.number,
      description: PropTypes.string,
      isPublic: PropTypes.bool,
    }),
  };

  get link() {
    return `https://www.sportyspots.com/games/${this.props.navigation.state.params.uuid}`;
  }

  onCopy = () => {
    Clipboard.setString(this.link);
  };

  onShare = () => {
    Share.share(
      {
        message: 'You have been invited',
        url: this.link,
        title: 'Sportyspots',
      },
      {
        dialogTitle: I18n.t('invite'),
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text.L style={styles.title}>{I18n.t('Game created')}!</Text.L>
          <View style={styles.linkContainer}>
            <Text style={styles.link}>{this.link}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.shareButton} onPress={this.onShare}>
              <Icon size={24} color={Colors.white} name="share" />
              <Text.M style={styles.shareButtonText}>{I18n.t('Share')}</Text.M>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={this.onCopy}>
              <Icon size={24} color={Colors.white} name="content-copy" />
              <Text.M style={styles.shareButtonText}>{I18n.t('Copy')}</Text.M>
            </TouchableOpacity>
          </View>
          {false && (
            <View style={styles.inviteOnly}>
              <Checkbox
                color={Colors.white}
                checked={!this.props.gameDetails.isPublic}
                onPress={() =>
                  this.props.setGameDetailField('isPublic', !this.props.gameDetails.isPublic)
                }
                size={72}
              />
              <View style={styles.inviteOnlyTextContainer}>
                <Text.M style={styles.inviteOnlyText}>{I18n.t('This event is invite-only')}</Text.M>
              </View>
            </View>
          )}
        </View>
        <Footer
          numPages={4}
          currentPage={3}
          showBack={false}
          buttonNextText={I18n.t('done')}
          onNext={() => {
            this.props.navigation.popToTop();
            this.props.navigation.goBack(null);
          }}
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
  innerContainer: {
    flex: 1,
    padding: 32,
    alignItems: 'flex-start',
  },
  white: {
    color: Colors.white,
  },
  title: {
    color: Colors.white,
    marginBottom: 16,
  },
  linkContainer: {
    backgroundColor: Colors.black54,
    height: 64,
    padding: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  shareButtonText: {
    color: Colors.white,
    fontSize: 20,
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    marginRight: 8,
  },
  inviteOnly: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteOnlyText: {
    color: Colors.white,
    fontSize: 24,
  },
  inviteOnlyTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
