import React from 'react';
import PropTypes from 'prop-types';
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
const Calendar = ({ value, ...rest }) => {
  const markedDates = value ? ({
    [value.dateString]: {
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
          size={24}
          name={`keyboard-arrow-${direction}`}
          color={Colors.darkGray}
        />
      )}
      markedDates={markedDates}
      current={(
        value
          ? value.dateString
          : (new Date()).toISOString().slice(0, 10)
      )}
      minDate={(new Date()).toISOString().slice(0, 10)}
      {...rest}
    />
  );
};

Calendar.propTypes = {
  value: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    dateString: PropTypes.string,
  }),
  // Plus all props from native Calendar
};

Calendar.defaultProps = {
  value: null,
};
export default Calendar;
