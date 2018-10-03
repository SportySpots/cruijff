import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import I18n from '../../../I18n';
import api from '../../../Services/SeedorfApi';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import ShareForm from '../../../Components/PlanGame/ShareForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameScreen extends React.Component {
  state = {
    isPublic: true,
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) {
      return;
    }

    this.setState(
      { [fieldName]: value },
      () => { console.log(this.state); },
    );
  }

  handleNext = async () => {
    Keyboard.dismiss();
    const { navigation } = this.props;
    const { isPublic } = this.state;

    // Set game invite mode
    try {
      await api.setGameInviteMode({
        gameUUID: this.gameUUID,
        inviteMode: isPublic ? 'open' : 'invite_only',
      });
    } catch (exc) {
      console.log(exc);
    }

    // Go back to the begining of the stack
    navigation.popToTop();
    // Go back to main tabs navigation
    navigation.goBack(null);
    // Go to games list screen
    navigation.navigate('GamesListScreen');
    // Reset stack (otherwise we'll get a back arrow for some wired reason :S)
    navigation.dispatch(new NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'GamesListScreen',
        }),
      ],
    }));
    // Finally go to recently created game
    navigation.navigate('GameDetailsScreen', { uuid: this.gameUUID });
  }

  render() {
    const { isPublic } = this.state;

    return (
      <FullHeight>
        <FormLayout
          theme="white"
          title={`${I18n.t('Activity created')}!`}
          closable={false}
        >
          <ShareForm
            gameUUID={this.gameUUID}
            isPublic={isPublic}
            onChange={this.handleChange}
          />
        </FormLayout>
        <Footer
          numPages={4}
          currentPage={3}
          onNext={this.handleNext}
          showBack={false}
          buttonNextText={I18n.t('Close')}
        />
      </FullHeight>
    );
  }
}

ShareGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShareGameScreen;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, Clipboard, Share } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import config from '../../../config';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import ShareForm from '../../../Components/PlanGame/ShareForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height /
  `;
  //------------------------------------------------------------------------------
  // COMPONENT:
  //------------------------------------------------------------------------------
  class ShareGameScreen extends React.Component {
    state = {
      share: false,
    }

    get gameUuid() {
      const { navigation } = this.props;
      return navigation.state.params.uuid;
    }

    get link() {
      return `https://${config.deeplinkHost}/games/${this.gameUuid}`;
    }

    handleChange = ({ fieldName, value }) => {
      if (!fieldName || !value) {
        return;
      }

      this.setState(
        { [fieldName]: value },
        () => { console.log(this.state); },
      );
    }

    handleCopy = () => {
      Clipboard.setString(this.link);
    };

    handleShare = () => {
      const message = `${I18n.t('You have been invited to a SportySpots game:')} ${this.link}`;
      Share.share(
        {
          message,
          title: 'Sportyspots',
        },
        {
          dialogTitle: I18n.t('share'),
        },
      );
    };

    handleNext = () => {
      Keyboard.dismiss();
      const { navigation } = this.props;

      // Go back to the begining of the stack
      navigation.popToTop();
      // Go back to main tabs navigation
      navigation.goBack(null);
      // Go to games list screen
      navigation.navigate('GamesListScreen');
      // Reset stack (otherwise we'll get a back arrow for some wired reason :S)
      navigation.dispatch(new NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'GamesListScreen',
          }),
        ],
      }));
      // Finally go to recently created game
      navigation.navigate('GameDetailsScreen', { uuid: this.gameUuid });
    }

    render() {
      // const { share } = this.state;

      return (
        <FullHeight>
          <FormLayout
            theme="white"
            title={I18n.t('Game created')}
            closable={false}
          >
            <ShareForm
              onChange={this.handleChange}
              link={this.link}
            />
          </FormLayout>
          <Footer
            numPages={4}
            currentPage={3}
            onNext={this.handleNext}
            showBack={false}
            buttonNextText="Done"
          />
        </FullHeight>
      );
    }
  }

  ShareGameScreen.propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    /* user: PropTypes.shape({
      claims: PropTypes.shape({
        username: PropTypes.string,
      }).isRequired,
    }).isRequired, //
  };

  /* const mapStateToProps = state => ({
    gameDetails: state.plan.gameDetails,
    nav: state.nav,
    user: state.user,
  });

  const dispatchToProps = {
    clear: planGameAction.clearGame,
    setGameDetailField: planGameAction.setGameDetailField,
    navigate: NavigationActions.navigate,
  };

  const withRedux = connect(mapStateToProps, dispatchToProps);

  const enhance = compose(
    withNavigation,
    withRedux,
  ); //

  export default ShareGameScreen;
*/
