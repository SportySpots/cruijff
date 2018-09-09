import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import Field from '../../PlanGame/Field';
import DateModal from '../Modals/DatePickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DateField extends React.PureComponent {
  state = {
    isVisible: false, // wheter or not the modal is visible
  }

  openModal = () => {
    this.setState({ isVisible: true });
  }

  closeModal = () => {
    this.setState({ isVisible: false });
  }

  handleSelect = (date) => {
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
        value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
        onPress={this.openModal}
      />,
      <DateModal
        key="modal"
        visible={isVisible}
        onSelect={this.handleSelect}
      />,
    ];
  }
}

DateField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DateField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DateField;
