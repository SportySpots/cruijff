import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import DefaultButton from '../../../Components/Common/DefaultButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AttendingBtn = ({ onPress }) => (
  <DefaultButton
    style={{ flex: 1, marginLeft: -10 }}
    bgColor={Colors.primaryGreen}
    textColor={Colors.white}
    text={I18n.t("I'm attending")}
    onPress={onPress}
  />
);

AttendingBtn.propTypes = {
  onPress: PropTypes.func,
};

AttendingBtn.defaultProps = {
  onPress: () => {},
};

export default AttendingBtn;
