import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Footer from '../../Common/DarkFooter';
import ClosableLayout from '../../Layouts/ClosableLayout';
import ShareGameButton from '../../Games/ShareGameButton';
// import InviteOnly from '../InviteOnly';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height /
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameForm extends React.PureComponent {
  state = {
    isPublic: true,
  }

  handleChange = ({ fieldName, value }) => {
    this.setState(
      { [fieldName]: value },
      () => { console.log(this.state); },
    );
  }

  handleNext = async () => {
    const {
      game,
      onBeforeHook,
      onClientCancelHook,
      // onClientErrorHook,
      onSuccessHook,
    } = this.props;

    firebase.analytics().logEvent('share_activity_footer_next_btn_press');

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const { isPublic } = this.state;

    // Pass event up to parent component
    onSuccessHook({ gameUUID: game.uuid, isPublic });
  }

  render() {
    const { game, disabled } = this.props;
    // const { isPublic } = this.state;

    return (
      <FlexOne>
        <ClosableLayout
          theme="white"
          title={I18n.t('shareGameScreen.title')}
          closable={false}
        >
          <Spacer size="XXL" />
          <Spacer size="L" />
          <Text size="ML" color="white">
            {I18n.t('shareGameScreen.invite')}
          </Text>
          <Spacer size="XL" />
          <Text color="white" semibold>
            {I18n.t('shareGameScreen.shareVia')}
          </Text>
          <Spacer size="XXL" />
          <Row alignItems="center">
            <ShareGameButton shareLink={game.share_link} />
          </Row>
          <Spacer size="XXL" />
          <Spacer size="L" />
          <Text color="white" semibold>
            {I18n.t('shareGameScreen.remember')}
          </Text>
          {/* <InviteOnly
            isPublic={isPublic}
            onPress={(value) => { this.handleChange({ fieldName: 'isPublic', value }); }}
          /> */}
        </ClosableLayout>
        <Footer
          numPages={4}
          currentPage={3}
          onNext={this.handleNext}
          disableNext={disabled}
          showBack={false}
          buttonNextText={I18n.t('shareGameScreen.footer.nextBtnLabel')}
        />
      </FlexOne>
    );
  }
}

ShareGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  // onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

ShareGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  // onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default ShareGameForm;
