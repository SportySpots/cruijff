import moment from 'moment';

const dateStringToTimeString = (dateString) => {
  const date = new Date(dateString);
  return (`
    ${(date.getHours() < 10 ? '0' : '')}${date.getHours()}:
    ${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}
  `);
};

export const setDate = (date) => {
  // console.log('setDate date', date);
  const now = new Date();
  const startTime = moment(`${date}T${moment(now).format('HH:mm:ss')}`).toISOString();
  // console.log('startTime', startTime);
  return startTime;
};

export const setStartTime = (startTime, time) => {
  // console.log('setStartTime');
  const timeString = `${dateStringToTimeString(time)}:00`;
  const newStartTime = moment(`${moment(startTime).format('YYYY-MM-DD')}T${timeString}`).toISOString();
  // console.log('newStartTime', newStartTime);
  return newStartTime;
};

export const setEndTime = (startTime, time, duration) => {
  // console.log('setEndTime');
  const timeString = `${dateStringToTimeString(time)}:00`;
  const newEndTime = moment(`${moment(startTime).format('YYYY-MM-DD')}T${timeString}`).add(duration, 'minutes').toISOString();
  // console.log('newEndTime', newEndTime);
  return newEndTime;
};
