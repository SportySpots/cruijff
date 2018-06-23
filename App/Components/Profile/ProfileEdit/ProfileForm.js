import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Slider from '../../Slider';
import Text from '../../Text';
import DefaultButton from '../../DefaultButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Form = styled.View`
  margin: 0 16px;
`;
//------------------------------------------------------------------------------
const FieldSet = styled.View`
  margin-top: 16px;
`;
//------------------------------------------------------------------------------
const Input = styled(TextInput)`
  font-size: 16px;
  margin: 8px 0;
  padding: 8px 0;
`;
//------------------------------------------------------------------------------
/* const SliderLabel = styled.View`
  flex-direction: row;
  justify-content: space-between;
`; */
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      first_name: firstName,
      last_name: lastName,
    } = props.user;

    this.state = {
      firstName,
      lastName,
    };
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  handleSubmit = () => {
    const { user, onSubmit } = this.props;
    const { firstName, lastName } = this.state;

    // Pass event up to parent component
    onSubmit({ uuid: user.uuid, firstName, lastName });
  }

  render() {
    const { firstName, lastName } = this.state;

    return (
      <Form>
        <FieldSet>
          <Text>{I18n.t('First name')}</Text>
          <Input
            value={firstName}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'firstName', value });
            }}
          />
        </FieldSet>
        <FieldSet>
          <Text>{I18n.t('Last name')}</Text>
          <Input
            value={lastName}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'lastName', value });
            }}
          />
        </FieldSet>
        {/* <FieldSet>
            <Text>{I18n.t('Age')}</Text>
            <TextInput keyboardType="numeric" defaultValue="30" />
          </FieldSet>
          <FieldSet>
            <Text>{I18n.t('Style')}</Text>
            <SliderLabel>
              <Text.S>{I18n.t('recreative')}</Text.S>
              <Text.S>{I18n.t('competitive')}</Text.S>
            </SliderLabel>
            <View style={{ flex: 1, height: 50 }}>
              <Slider value={this.props.user.level} onChange={console.log} />
            </View>
          </FieldSet> */}
        <DefaultButton
          // style={{ width: 100 }}
          text={I18n.t('Save')}
          onPress={this.handleSubmit}
        />
      </Form>
    );
  }
}

ProfileForm.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onSubmit: PropTypes.func,
};

ProfileForm.defaultProps = {
  onSubmit: () => {},
};

export default ProfileForm;
