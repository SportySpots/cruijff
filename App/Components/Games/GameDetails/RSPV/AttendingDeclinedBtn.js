import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n/index';
import Colors from '../../../../Themes/Colors';
import DefaultButton from '../../../../Components/DefaultButton';

const AttendingDeclinedBtn = ({ isAttending, onDeclined, onAttending }) => (
  <DefaultButton
    style={{ flex: 1, marginLeft: -10 }}
    bgColor={isAttending ? Colors.white : Colors.primaryGreen}
    borderColor={isAttending ? Colors.black : Colors.primaryGreen}
    textColor={isAttending ? Colors.black : Colors.white}
    text={I18n.t(isAttending ? "I'm not attending" : "I'm attending")}
    onPress={isAttending ? onDeclined : onAttending}
  />
);

AttendingDeclinedBtn.propTypes = {
  isAttending: PropTypes.bool,
  onAttending: PropTypes.func,
  onDeclined: PropTypes.func,
};


AttendingDeclinedBtn.defaultProps = {
  isAttending: false,
  onAttending: () => {},
  onDeclined: () => {},
};

export default AttendingDeclinedBtn;
