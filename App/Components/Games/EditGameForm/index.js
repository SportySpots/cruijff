import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
// import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
import SpotPickerField from '../../Common/SpotPickerField';
// import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
// import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
import SwitchWithText from '../../Common/SwitchWithText';
// import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';
import RaisedButton from '../../Common/RaisedButton';
import { getAttendees } from '../utils';
import { getDate, getTime, getDuration } from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const NAME_MAX_CHARS = 120;
const DESCRIPTION_MAX_CHARS = 2000;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Half = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { game } = props;
    console.log('GAME', game);
    const {
      name,
      sport,
      start_time: startTime,
      end_time: endTime,
      capacity,
      spot,
      description,
      invite_mode: inviteMode,
    } = game;

    this.state = {
      name,
      sport,
      date: startTime ? getDate(startTime) : null,
      time: startTime ? getTime(startTime) : null,
      duration: startTime && endTime ? getDuration(startTime, endTime) : null,
      capacity,
      spot,
      description: description || '',
      isPublic: inviteMode !== 'INVITE_ONLY',
      errors: {
        name: [],
        capacity: [],
        description: [],
      },
      // Keep track of field position in order to 'scroll to' on error
      offsetY: {
        name: 0,
        capacity: 0,
        description: 0,
      },
    };

    console.log('STATE', this.state);
  }

  clearErrors = () => {
    this.setState({
      errors: {
        name: [],
        capacity: [],
        description: [],
      },
    });
  };

  handleLayout = ({ fieldName, nativeEvent }) => {
    const { offsetY } = this.state;

    this.setState({
      offsetY: {
        ...offsetY,
        [fieldName]: nativeEvent.layout.y,
      },
    });
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) {
      return;
    }

    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({ name, capacity, description }) => {
    const { game } = this.props;

    // Initialize errors
    const errors = {
      name: [],
      capacity: [],
      description: [],
    };

    // Sanitize input
    const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    if (!_name) {
      errors.name.push('Name is required');
    } else if (_name.length > NAME_MAX_CHARS) {
      errors.name.push('Name is too long');
    }

    // Sanitize input
    const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

    if (_description.length > DESCRIPTION_MAX_CHARS) {
      errors.description.push('Description is too long');
    }

    const attendees = getAttendees(game.attendees); // [1, 2, 3, 4, 5, 6];
    if (capacity && attendees.length > capacity) {
      errors.capacity.push('Number of attendees is greater than the number of spots');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      game,
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const {
      name,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
    } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ name, capacity, description });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Scroll to first error field
      const { offsetY } = this.state;
      const firstErrorKey = ErrorHandling.getFirstError(errors).key; // 'name', 'attendees', 'description'
      const y = parseInt(offsetY[firstErrorKey], 10);
      this.scroller.scrollTo({ x: 0, y });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({
      gameUUID: game.uuid,
      name,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
    });
  }

  render() {
    const { disabled } = this.props;
    const {
      name,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
      isPublic,
      errors,
    } = this.state;

    // Apply translation and concatenate field errors (string)
    const nameErrors = ErrorHandling.getFieldErrors(errors, 'name', I18n.t);
    const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity', I18n.t);
    const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

    return (
      <FullHeight>
        <TopLayout ref={(scroller) => { this.scroller = scroller; }}>
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'name', nativeEvent }); }}
          >
            <TextField
              label={I18n.t('Activity name')}
              value={name}
              error={nameErrors}
              placeholder={I18n.t('Write here why the activity does not continue')}
              size="ML"
              disabled={disabled}
              // multiline
              onChangeText={(value) => { this.handleChange({ fieldName: 'name', value }); }}
            />
          </Block>
          <Block
            midHeight
            bgColor={Colors.lightGray}
          >
            <TextField
              label={I18n.t('Sport')}
              value={I18n.t(sport.name) || I18n.t(sport.category)}
              size="ML"
              disabled // always disabled
              onChangeText={() => {}}
            />
          </Block>
          <Block midHeight>
            <DatePickerField
              label={I18n.t('Date')}
              value={date}
              size="ML"
              disabled={disabled}
              theme="transparent"
              dateFormat="DD/MM/YYYY"
              boxed
              onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
            />
          </Block>
          <Divider />
          <Row>
            <Half>
              <Block midHeight>
                <TimePickerField
                  label={I18n.t('Start time')}
                  value={time}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  boxed
                  onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
                />
              </Block>
            </Half>
            <Divider row />
            <Half>
              <Block midHeight>
                <DurationPickerField
                  label={I18n.t('Duration')}
                  value={duration}
                  size="ML"
                  disabled={disabled}
                  theme="transparent"
                  boxed
                  onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
                />
              </Block>
            </Half>
          </Row>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'capacity', nativeEvent }); }}
          >
            <CapacityPickerField
              label={I18n.t('Number of players')}
              value={capacity}
              error={capacityErrors}
              size="ML"
              disabled={disabled}
              theme="transparent"
              boxed
              onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
            />
          </Block>
          <Divider />
          <Block>
            <SpotPickerField
              value={spot}
              sport={sport}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'spot', value }); }}
            />
          </Block>
          <Divider />
          <Block
            midHeight
            onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'description', nativeEvent }); }}
          >
            <TextField
              label={I18n.t('Activity details')}
              value={description}
              theme="black"
              error={descriptionErrors}
              disabled={disabled}
              characterRestriction={DESCRIPTION_MAX_CHARS}
              multiline
              placeholder={I18n.t('Write extra details about the activity')}
              onChangeText={(value) => { this.handleChange({ fieldName: 'description', value }); }}
            />
          </Block>
          <Divider />
          <Block>
            <SwitchWithText
              label={I18n.t('This is a private activity')}
              value={!isPublic}
              disabled={disabled}
              onChange={(value) => { this.handleChange({ fieldName: 'isPublic', value: !value }); }}
            />
          </Block>
        </TopLayout>
        <BottomLayout>
          <RaisedButton
            variant="primary"
            label={I18n.t('Save')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </BottomLayout>
      </FullHeight>
    );
  }
}

EditGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EditGameForm;


/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
// import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
// import SportPickerField from '../../Common/SportPickerField';
import DatePickerField from '../../Common/DatePickerField';
import TimePickerField from '../../Common/TimePickerField';
import DurationPickerField from '../../Common/DurationPickerField';
import CapacityPickerField from '../../Common/CapacityPickerField';
// import DescriptionField from '../../Common/DescriptionField';
import EditSpotField from '../../Spots/EditSpotField';
import SpotsList from '../../Spots/SpotsList';
// import Spacer from '../../Common/Spacer';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
// import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
import SwitchWithText from '../../Common/SwitchWithText';
// import datePickerDatePropTypes from '../../../PropTypesDefinitions/datePickerDate';
import RaisedButton from '../../Common/RaisedButton';
import { getAttendees } from '../utils';
import { getDate, getTime, getDuration } from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const NAME_MAX_CHARS = 120;
const DESCRIPTION_MAX_CHARS = 2000;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Half = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height /
  `;
  //------------------------------------------------------------------------------
  const SpotsContainer = styled.View`
    flex: 1; /* full height /
    background-color: ${Colors.concrete};
    padding: 0 16px;
  `;
  //------------------------------------------------------------------------------
  // COMPONENT:
  //------------------------------------------------------------------------------
  class EditGameForm extends React.PureComponent {
    constructor(props) {
      super(props);

      const { game } = props;
      console.log('GAME', game);
      const {
        name,
        sport,
        start_time: startTime,
        end_time: endTime,
        capacity,
        spot,
        description,
        invite_mode: inviteMode,
      } = game;

      this.state = {
        name,
        sport,
        date: startTime ? getDate(startTime) : null,
        time: startTime ? getTime(startTime) : null,
        duration: startTime && endTime ? getDuration(startTime, endTime) : null,
        capacity,
        spot,
        description: description || '',
        isPublic: inviteMode !== 'INVITE_ONLY',
        errors: {
          name: [],
          capacity: [],
          description: [],
        },
        // Keep track of field position in order to 'scroll to' on error
        offsetY: {
          name: 0,
          capacity: 0,
          description: 0,
        },
      };

      console.log('STATE', this.state);
    }

    clearErrors = () => {
      this.setState({
        errors: {
          name: [],
          capacity: [],
          description: [],
        },
      });
    };

    handleLayout = ({ fieldName, nativeEvent }) => {
      const { offsetY } = this.state;

      this.setState({
        offsetY: {
          ...offsetY,
          [fieldName]: nativeEvent.layout.y,
        },
      });
    }

    handleChange = ({ fieldName, value }) => {
      if (!fieldName) {
        return;
      }

      const { errors } = this.state;

      // Update value and clear errors for the given field
      this.setState({
        [fieldName]: value,
        errors: ErrorHandling.clearErrors(errors, fieldName),
      });
    }

    validateFields = ({ name, capacity, description }) => {
      const { game } = this.props;

      // Initialize errors
      const errors = {
        name: [],
        capacity: [],
        description: [],
      };

      // Sanitize input
      const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

      if (!_name) {
        errors.name.push('Name is required');
      } else if (_name.length > NAME_MAX_CHARS) {
        errors.name.push('Name is too long');
      }

      // Sanitize input
      const _description = description && description.trim(); // eslint-disable-line no-underscore-dangle

      if (_description.length > DESCRIPTION_MAX_CHARS) {
        errors.description.push('Description is too long');
      }

      const attendees = getAttendees(game.attendees); // [1, 2, 3, 4, 5, 6];
      if (capacity && attendees.length > capacity) {
        errors.capacity.push('Number of attendees is greater than the number of spots');
      }

      return errors;
    };

    handleSubmit = () => {
      const {
        game,
        onBeforeHook,
        onClientCancelHook,
        onClientErrorHook,
        onSuccessHook,
      } = this.props;

      // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
      // value to 'true' so that the user cannot re-submit the form
      try {
        onBeforeHook();
      } catch (exc) {
        onClientCancelHook();
        return; // return silently
      }

      // Get field values
      const {
        name,
        date,
        time,
        duration,
        capacity,
        spot,
        description,
        isPublic,
      } = this.state;

      // Clear previous errors if any
      this.clearErrors();

      // Validate fields
      const errors = this.validateFields({ name, capacity, description });

      // In case of errors, display on UI and return handler to parent component
      if (ErrorHandling.hasErrors(errors)) {
        this.setState({ errors });
        // Scroll to first error field
        const { offsetY } = this.state;
        const firstErrorKey = ErrorHandling.getFirstError(errors).key; // 'name', 'attendees', 'description'
        const y = parseInt(offsetY[firstErrorKey], 10);
        this.scroller.scrollTo({ x: 0, y });
        // Pass event up to parent component. onClientErrorHook will set 'disabled'
        // value back to 'false' so that the user can re-submit the form
        onClientErrorHook();
        return;
      }

      // Pass event up to parent component. onSuccessHook 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onSuccessHook({
        gameUUID: game.uuid,
        name,
        date,
        time,
        duration,
        capacity,
        spot,
        description,
        isPublic,
      });
    }

    render() {
      const { disabled } = this.props;
      const {
        name,
        sport,
        date,
        time,
        duration,
        capacity,
        spot,
        description,
        isPublic,
        errors,
      } = this.state;

      // Apply translation and concatenate field errors (string)
      const nameErrors = ErrorHandling.getFieldErrors(errors, 'name', I18n.t);
      const capacityErrors = ErrorHandling.getFieldErrors(errors, 'capacity', I18n.t);
      const descriptionErrors = ErrorHandling.getFieldErrors(errors, 'description', I18n.t);

      return (
        <FullHeight>
          <Swiper
            ref={(swiper) => { this.swiper = swiper; }}
            loop={false}
            showsPagination={false}
          >
            <FullHeight>
              <TopLayout ref={(scroller) => { this.scroller = scroller; }}>
                <Block
                  midHeight
                  onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'name', nativeEvent }); }}
                >
                  <TextField
                    label={I18n.t('Activity name')}
                    value={name}
                    error={nameErrors}
                    placeholder={I18n.t('Write here why the activity does not continue')}
                    size="ML"
                    disabled={disabled}
                    // multiline
                    onChangeText={(value) => { this.handleChange({ fieldName: 'name', value }); }}
                  />
                </Block>
                <Block
                  midHeight
                  bgColor={Colors.lightGray}
                >
                  <TextField
                    label={I18n.t('Sport')}
                    value={I18n.t(sport.name) || I18n.t(sport.category)}
                    size="ML"
                    disabled // always disabled
                    onChangeText={() => {}}
                  />
                </Block>
                <Block midHeight>
                  <DatePickerField
                    label={I18n.t('Date')}
                    value={date}
                    size="ML"
                    disabled={disabled}
                    theme="transparent"
                    dateFormat="DD/MM/YYYY"
                    boxed
                    onChange={(value) => { this.handleChange({ fieldName: 'date', value }); }}
                  />
                </Block>
                <Divider />
                <Row>
                  <Half>
                    <Block midHeight>
                      <TimePickerField
                        label={I18n.t('Start time')}
                        value={time}
                        size="ML"
                        disabled={disabled}
                        theme="transparent"
                        boxed
                        onChange={(value) => { this.handleChange({ fieldName: 'time', value }); }}
                      />
                    </Block>
                  </Half>
                  <Divider row />
                  <Half>
                    <Block midHeight>
                      <DurationPickerField
                        label={I18n.t('Duration')}
                        value={duration}
                        size="ML"
                        disabled={disabled}
                        theme="transparent"
                        boxed
                        onChange={(value) => { this.handleChange({ fieldName: 'duration', value }); }}
                      />
                    </Block>
                  </Half>
                </Row>
                <Divider />
                <Block
                  midHeight
                  onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'capacity', nativeEvent }); }}
                >
                  <CapacityPickerField
                    label={I18n.t('Number of players')}
                    value={capacity}
                    error={capacityErrors}
                    size="ML"
                    disabled={disabled}
                    theme="transparent"
                    boxed
                    onChange={(value) => { this.handleChange({ fieldName: 'capacity', value }); }}
                  />
                </Block>
                <Divider />
                <Block>
                  <EditSpotField
                    spot={spot}
                    disabled={disabled}
                    onPress={() => { this.swiper.scrollBy(1); }}
                  />
                </Block>
                <Divider />
                <Block
                  midHeight
                  onLayout={({ nativeEvent }) => { this.handleLayout({ fieldName: 'description', nativeEvent }); }}
                >
                  <TextField
                    label={I18n.t('Activity details')}
                    value={description}
                    theme="black"
                    error={descriptionErrors}
                    disabled={disabled}
                    characterRestriction={DESCRIPTION_MAX_CHARS}
                    multiline
                    placeholder={I18n.t('Write extra details about the activity')}
                    onChangeText={(value) => { this.handleChange({ fieldName: 'description', value }); }}
                  />
                </Block>
                <Divider />
                <Block>
                  <SwitchWithText
                    label={I18n.t('This is a private activity')}
                    value={!isPublic}
                    disabled={disabled}
                    onChange={(value) => { this.handleChange({ fieldName: 'isPublic', value: !value }); }}
                  />
                </Block>
              </TopLayout>
              <BottomLayout>
                <RaisedButton
                  variant="primary"
                  label={I18n.t('Save')}
                  disabled={disabled}
                  onPress={this.handleSubmit}
                />
              </BottomLayout>
            </FullHeight>
            <SpotsContainer>
              <SpotsList
                cardComponent="SpotListCardSmall"
                sportsIds={sport && sport.id ? [sport.id] : []} // empty array will return all spots
                // userCoords={userCoords}
                // maxDistance={maxDistance} // km
                selectedSpot={spot}
                onCardPress={(value) => {
                  this.handleChange({ fieldName: 'spot', value });
                  this.swiper.scrollBy(-1);
                }}
              />
            </SpotsContainer>
          </Swiper>
        </FullHeight>
      );
    }
  }

  EditGameForm.propTypes = {
    game: propType(gameDetailsFragment).isRequired,
    disabled: PropTypes.bool,
    onBeforeHook: PropTypes.func,
    onClientCancelHook: PropTypes.func,
    onClientErrorHook: PropTypes.func,
    onSuccessHook: PropTypes.func,
  };

  EditGameForm.defaultProps = {
    disabled: false,
    onBeforeHook: () => {},
    onClientCancelHook: () => {},
    onClientErrorHook: () => {},
    onSuccessHook: () => {},
  };

  export default EditGameForm;

*/