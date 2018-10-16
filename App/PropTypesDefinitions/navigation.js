import PropTypes from 'prop-types';

const navigationPropTypes = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  state: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
});

export default navigationPropTypes;
