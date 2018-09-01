import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from '../../I18n/index';
import Field from './Field';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const timeStringToDate = (timeString) => {
  const hours = timeString.split(':')[0];
  const minutes = timeString.split(':')[1];
  return new Date(Date.UTC(2016, 6, 6, hours, minutes, 0));
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class TimeField extends React.PureComponent {
  state = {
    isVisible: false, // whether or not the modal is visible
  }

  openModal = () => {
    this.setState({ isVisible: true });
  }

  closeModal = () => {
    this.setState({ isVisible: false });
  }

  handleConfirm = (date) => {
    const { onChange } = this.props;
    // Pass event up to parent component
    onChange(date);
    this.closeModal();
  }

  render() {
    const { value } = this.props;
    const { isVisible } = this.state;

    return [
      <Field
        key="field"
        value={value ? moment(value).format('HH:mm') : I18n.t('Select')}
        onPress={this.openModal}
      />,
      <DateTimePicker
        key="picker"
        mode="time"
        isVisible={isVisible}
        date={timeStringToDate(value || '12:00')}
        onConfirm={this.handleConfirm}
        onCancel={this.closeModal}
      />,
    ];
  }
}

TimeField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TimeField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default TimeField;
