import React from 'react';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
// import styled from 'styled-components/native';
/// import I18nNative from 'react-native-i18n';
// import I18n from '../../../I18n';
// import Block from '../../../Components/Common/Block';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LocaleSwitch extends React.Component {
  state = {
    /// locale: I18nNative.locale,
  }

  handleLocaleChange = (locale) => {
    console.log('HANDLE LOCALE CHANGE', locale);
    this.setState({ locale });
    //// I18nNative.locale = locale;
    moment.locale(locale);
  }

  render() {
    const { locale } = this.state;
    // Force app to re-render
    console.log('NEW LOCALE!!!', locale);

    return (
      <Row>
        <TouchableOpacity onPress={() => { this.handleLocaleChange('en'); }}>
          <Text>EN</Text>
        </TouchableOpacity>
        <Spacer row size="L" />
        <TouchableOpacity onPress={() => { this.handleLocaleChange('nl'); }}>
          <Text>NL</Text>
        </TouchableOpacity>
      </Row>
    );
  }
}

export default LocaleSwitch;
