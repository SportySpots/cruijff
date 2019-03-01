import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import Footer from '../../Common/DarkFooter';
import ClosableLayout from '../../Layouts/ClosableLayout';
import ShareGameButton from '../../Games/ShareGameButton';
import InviteOnly from '../InviteOnly';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height /
`;
//------------------------------------------------------------------------------
const Subtitle = styled(Text.ML)`
  color: ${Colors.white};
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
      gameUUID,
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
    onSuccessHook({ gameUUID, isPublic });
  }

  render() {
    const { gameUUID, disabled } = this.props;
    const { isPublic } = this.state;

    return (
      <FullHeight>
        <ClosableLayout
          theme="white"
          title={I18n.t('shareGameScreen.title')}
          closable={false}
        >
          <Spacer size="XXXL" />
          <Row alignItems="center">
            <Icon
              name="share-variant"
              size={35}
              color={Colors.white}
            />
            <Spacer row size="L" />
            <Subtitle>{I18n.t('shareGameScreen.invite')}</Subtitle>
          </Row>
          <Spacer size="XXL" />
          <ShareGameButton gameUUID={gameUUID} />
          <Spacer size="XXXL" />
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
      </FullHeight>
    );
  }
}

ShareGameForm.propTypes = {
  gameUUID: PropTypes.string.isRequired,
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
