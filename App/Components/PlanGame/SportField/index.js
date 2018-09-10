import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import Field from '../../Common/InputField';
import SportsModal from './SportsModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SportField extends React.PureComponent {
  state = {
    isVisible: false, // wheter or not the modal is visible
  }

  openModal = () => {
    this.setState({ isVisible: true });
  }

  closeModal = () => {
    this.setState({ isVisible: false });
  }

  handleSelect = (sport) => {
    const { onChange } = this.props;
    // Pass event up to parent component
    onChange(sport);
    this.closeModal();
  }

  render() {
    const { value } = this.props;
    const { isVisible } = this.state;

    return [
      <Field
        key="field"
        value={value ? I18n.t(value) : I18n.t('Select')}
        onPress={this.openModal}
      />,
      <SportsModal
        key="modal"
        visible={isVisible}
        onSelect={this.handleSelect}
      />,
    ];
  }
}

SportField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SportField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default SportField;
