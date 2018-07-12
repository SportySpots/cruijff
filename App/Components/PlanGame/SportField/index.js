import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n/index';
import Field from '../Field';
import SportsModal from './SportsModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SportField extends React.Component {
  state = {
    isVisible: false, // wheter or not the modal is visible
  }

  openModal() {
    this.setState({ isVisible: true });
  }
  closeModal() {
    this.setState({ isVisible: false });
  }

  handleSelect = () => {
    const { onChange } = this.props;

    // Pass event up to parent component

  }

  render() {
    const { sport, sports } = this.props;
    const { isVisible } = this.state;

    return [
      <Field
        key="field"
        value={(sport && sport.name) ? I18n.t(sport.name) : I18n.t('Select')}
        onPress={this.openModal}
      />,
      <SportsModal
        key="modal"
        sports={sports}
        visible={isVisible}
        onSelect={this.handleSelect}
      />,
    ];
  }
}

SportField.propTypes = {
  sport: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onChange: PropTypes.func,
};

SportField.defaultProps = {
  onChange: () => {},
};

export default SportField;
