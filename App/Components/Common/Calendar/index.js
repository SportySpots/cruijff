import React from 'react';
import { Calendar as NativeCalendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// Specify style for calendar container element. Default = {}
const style = {
  // borderWidth: 1,
  // borderColor: 'gray',
  // height: 350,
};
//------------------------------------------------------------------------------
// Specify theme properties to override specific styles for calendar parts. Default = {}
const theme = {
  backgroundColor: Colors.transparent,
  calendarBackground: Colors.transparent,
  selectedDayBackgroundColor: Colors.primaryGreen,
  selectedDayTextColor: Colors.white,
  /* arrowColor: Colors.darkGray,
  textSectionTitleColor: '#b6c1cd',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  monthTextColor: 'blue',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textMonthFontWeight: 'bold',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16, */
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Calendar = props => (
  <NativeCalendar
    style={style}
    theme={theme}
    renderArrow={direction => (
      <Icon
        size={24}
        name={`keyboard-arrow-${direction}`}
        color={Colors.darkGray}
      />
    )}
    {...props}
  />
);

Calendar.propTypes = {
  // All props from native Calendar
};

export default Calendar;
