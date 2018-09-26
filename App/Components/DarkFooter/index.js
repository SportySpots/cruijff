import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import NavDots from '../Common/NavDots';
import Row from '../Common/Row';
import DarkFooterButton from '../DarkFooterButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 50;
  background-color: ${Colors.black},
`;
//------------------------------------------------------------------------------
const navDotsTheme = StyleSheet.create({
  circle: {
    backgroundColor: Colors.white20,
  },
  active: {
    backgroundColor: Colors.actionYellow,
  },
});
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DarkFooter = ({
  numPages,
  currentPage,
  buttonNextText,
  onNext,
  showNext,
  disableNext,
  buttonBackText,
  onBack,
  showBack,
  disableBack,
}) => (
  <Container>
    <Row
      alignItems="center"
      justifyContent="space-between"
    >
      {showBack && (
        <DarkFooterButton
          text={buttonBackText}
          onPress={onBack}
          disabled={disableBack}
          isBack
        />
      )}
      <NavDots
        count={numPages}
        active={currentPage}
        theme={navDotsTheme}
      />
      {showNext && (
        <DarkFooterButton
          text={buttonNextText}
          onPress={onNext}
          disabled={disableNext}
        />
      )}
    </Row>
  </Container>
);

DarkFooter.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  buttonNextText: PropTypes.string,
  onNext: PropTypes.func,
  showNext: PropTypes.bool,
  disableNext: PropTypes.bool,
  buttonBackText: PropTypes.string,
  onBack: PropTypes.func,
  showBack: PropTypes.bool,
  disableBack: PropTypes.bool,
};

DarkFooter.defaultProps = {
  buttonNextText: I18n.t('continue'),
  showNext: true,
  onNext: () => {},
  disableNext: false,
  buttonBackText: I18n.t('back'),
  onBack: () => {},
  showBack: true,
  disableBack: false,
};

export default DarkFooter;


/*
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import NavDots from '../Common/NavDots';
import Button from './Button';

export default class DarkFooter extends React.Component {
  static propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onNext: PropTypes.func,
    showNext: PropTypes.bool,
    disableNext: PropTypes.bool,
    buttonNextText: PropTypes.string,
    onBack: PropTypes.func,
    showBack: PropTypes.bool,
    disableBack: PropTypes.bool,
    buttonBackText: PropTypes.string,
  };

  static defaultProps = {
    buttonNextText: I18n.t('continue'),
    showNext: true,
    buttonBackText: I18n.t('back'),
    showBack: true,
  };

  onNext = () => {
    this.props.onNext && this.props.onNext();
  };

  onBack = () => {
    this.props.onBack && this.props.onBack();
  };

  render() {
    return (
      <View style={style.container}>
        {this.props.showBack && (
          <Button
            text={this.props.buttonBackText}
   

const navDotsTheme = StyleSheet.create({
  circle: {
    backgroundColor: Colors.white20,
  },
  active: {
    backgroundColor: Colors.actionYellow,
  },
});

*/