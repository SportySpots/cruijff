import PropTypes from 'prop-types';

const datePickerDatePropTypes = PropTypes.shape({
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  timestamp: PropTypes.number,
  dateString: PropTypes.string,
});

export default datePickerDatePropTypes;
