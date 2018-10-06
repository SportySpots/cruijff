import moment from 'moment';

const getHoursMinutes = (dateString) => {
  const date = new Date(dateString);
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
};

export const setDate = date => (
  moment.utc(date.dateString).startOf('day') // moment object
);

export const setStartTime = (startDate, time) => {
  const { hours, minutes } = getHoursMinutes(time);
  return startDate.clone().add(hours, 'hours').add(minutes, 'minutes'); // moment object
};

export const setEndTime = (startTime, duration) => (
  startTime.clone().add(duration, 'minutes') // moment object
);
