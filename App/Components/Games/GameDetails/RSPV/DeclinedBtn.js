import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n/index';
import Colors from '../../../../Themes/Colors';
import DefaultButton from '../../../../Components/DefaultButton';

const DeclinedBtn = ({ onPress }) => (
  <DefaultButton
    style={{ flex: 1, marginRight: -10 }}
    bgColor={Colors.red}
    textColor={Colors.white}
    text={I18n.t("I'm not attending")}
    onPress={onPress}
  />
);

DeclinedBtn.propTypes = {
  onPress: PropTypes.func,
};

DeclinedBtn.defaultProps = {
  onPress: () => {},
};

export default DeclinedBtn;
