import React from 'react';
import { Calendar as NativeCalendar } from 'react-native-calendars';
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
  /* textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  // textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  // arrowColor: 'orange',
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
    {...props}
  />
);

Calendar.propTypes = {
  // All props from native Calendar
};

export default Calendar;
