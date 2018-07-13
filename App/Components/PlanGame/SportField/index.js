import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Field from '../Field';
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
    const { sport } = this.props;
    const { isVisible } = this.state;

    return [
      <Field
        key="field"
        value={(sport && sport.name) ? I18n.t(sport.name) : I18n.t('Select')}
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
  sport: propType(sportFragment),
  onChange: PropTypes.func,
};

SportField.defaultProps = {
  sport: null,
  onChange: () => {},
};

export default SportField;
