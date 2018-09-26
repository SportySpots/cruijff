const dateStringToTimeString = (dateString) => {
  const date = new Date(dateString);
  return (
    `${(date.getHours() < 10 ? '0' : '') +
    date.getHours()
    }:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  );
};

export default dateStringToTimeString;