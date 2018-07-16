import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import Colors from '../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class TextField extends React.PureComponent {
  state = {
    value: this.props.value,
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  handleBlur = (value) => {
    const { onBlur } = this.props;
    // Pass event up to parent component
    onBlur(value);
  }

  render() {
    const { value } = this.state;

    return (
      <TextInput
        keyboardType="numeric"
        underlineColorAndroid={Colors.white}
        style={{ flex: 0.20, fontSize: 24, marginLeft: 8 }}
        value={value}
        onChangeText={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

TextField.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
};

TextField.defaultProps = {
  value: '',
  onBlur: () => {},
};

export default TextField;
