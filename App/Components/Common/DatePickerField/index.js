import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import Field from '../InputField';
import DatePickerModal from '../Modals/DatePickerModal';

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
      <DatePickerModal
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


/* import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextInput } from 'react-native';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
// import Field from '../../PlanGame/Field';
import TextField from '../TextField';
import DatePickerModal from '../Modals/DatePickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DatePickerField extends React.Component {
  constructor(props) {
    super(props);
    this.hidenInput = null;
  }

  render() {
    const { value, onChange } = this.props;
    const { hidenInput } = this;
    console.log('TEXT INPUT!!!!!!!!!!!!', hidenInput);
    console.log('CHILDREN', TextField);

    return [
      <TextInput
        key="hidden-field"
        ref={(elem) => { this.hidenInput = elem; }}
        label="Hola"
      />,
      <ModalProps key="bla">
        {({ visible, openModal, closeModal }) => [
          <TextField
            key="input"
            label=""
            /* setRef={(elem) => {
              console.log('SET REFFFFFFFFFFFFFFFF');
              // console.log('ELEMMMMMMMM', elem);
              this.hidenInput = elem.input;
            }} //
            value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
            onFocus={openModal}
          />,
          <DatePickerModal
            key="modal"
            visible={visible}
            onSelect={(date) => {
              // Pass event up to parent component
              onChange(date);
              hidenInput.blur();
              closeModal();
            }}
            onClose={() => {
              // hidenInput.blur();
              hidenInput.blur();
              closeModal();
            }}
          />,
        ]}
      </ModalProps>,
    ];
  }
}

DatePickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DatePickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DatePickerField;
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
// import Field from '../../PlanGame/Field';
import TextField from '../TextField';
import DatePickerModal from '../Modals/DatePickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DatePickerField extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  render() {
    const { value, onChange } = this.props;
    const { textInput } = this;
    console.log('TEXT INPUT', textInput);

    return (
      <ModalProps>
        {({ visible, openModal, closeModal }) => [
          <TouchableOpacity
            key="field"
            onPress={openModal}
          >
            <TextField
              /* ref={(elem) => {
                console.log('SET REFFFFFFFFFFFFFFFF');
                this.textInput = elem;
              }} //
              value={value ? moment(value).format('DD-MM') : I18n.t('Select')}
            />
          </TouchableOpacity>,
          <DatePickerModal
            key="modal"
            visible={visible}
            onSelect={(date) => {
              // Pass event up to parent component
              onChange(date);
              // textInput.blur();
              closeModal();
            }}
            onClose={() => {
              // textInput.blur();
              closeModal();
            }}
          />,
        ]}
      </ModalProps>
    );
  }
}

DatePickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DatePickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default DatePickerField;

*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import Field from '../../PlanGame/Field';
import DatePickerModal from '../Modals/DatePickerModal';

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
      <DatePickerModal
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
*/
