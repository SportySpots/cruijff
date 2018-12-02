/* import moment from 'moment-timezone';

export const getUserTZ = () => (moment.tz.guess());

// date is in local time
export const setDate = date => (
  moment(date.dateString).utc().startOf('day') // moment UTC object
);

// startDate is moment UTC, time is in local time
export const setStartTime = (startDate, time) => {
  const utcTime = moment(time).utc();
  const hours = utcTime.hours();
  const minutes = utcTime.minutes();
  return startDate.clone().add(hours, 'hours').add(minutes, 'minutes'); // moment UTC object
};

// startTime is moment UTC, duration is minutes
export const setEndTime = (startTime, duration) => (
  startTime.clone().add(duration, 'minutes') // moment UTC object
); */
