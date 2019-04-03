import React from 'react';
import { Calendar as NativeCalendar } from 'react-native-calendars';
import PropTypes from 'prop-types';
import moment from 'moment';
import Colors from '../../../Themes/Colors';
import Icon from '../Icon';

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
const Calendar = ({ value, onDayPress, ...rest }) => {
  if (value && (!(value instanceof moment) || !value.isUTC())) {
    throw new TypeError('Calendar: Invalid input value. Use a moment instance with UTC timezone');
  }

  // Highlight selected date
  const markedDates = value ? ({
    [value.format('YYYY-MM-DD')]: {
      selected: true,
      disableTouchEvent: true,
    },
  }) : {};

  return (
    <NativeCalendar
      style={style}
      theme={theme}
      hideExtraDays
      renderArrow={direction => (
        <Icon
          iconSet="MaterialIcons"
          iconName={`keyboard-arrow-${direction}`}
          size={24}
          color="darkGray"
        />
      )}
      markedDates={markedDates}
      current={(value || moment()).clone().local().toDate()}
      onDayPress={(r) => {
        // convert the selected day to a moment UTC
        // moment uses month 0: january, NativeCalendar month 1: january
        onDayPress(moment.utc([r.year, r.month - 1, r.day]));
      }}
      minDate={moment().local().startOf('day').toDate()}
      {...rest}
    />
  );
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(moment),
  // Plus all props from native Calendar
};

Calendar.defaultProps = {
  value: moment.utc(),
};
export default Calendar;
