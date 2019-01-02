import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import SliderWithText from '../../Common/SliderWithText';
import SwitchWithText from '../../Common/SwitchWithText';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { maxDistance, allSports, selectedSportIds } = props;
    this.state = { maxDistance, allSports, selectedSportIds };
  }

  handleDistanceChange = (maxDistance) => {
    this.setState({ maxDistance });
  }

  handleAllSportsChange = (allSports) => {
    this.setState({ allSports, selectedSportIds: [] });
  }

  handleSportChange = (sportId) => {
    this.setState((prevState) => {
      // Check whether or not sportId is already in the list of selected sports.
      const index = prevState.selectedSportIds.indexOf(sportId);

      // If yes, remove it from the list; otherwise, add it.
      return {
        selectedSportIds: index !== -1 ? [
          ...prevState.selectedSportIds.slice(0, index),
          ...prevState.selectedSportIds.slice(index + 1),
        ] : [...prevState.selectedSportIds, sportId],
        // Finally, update allSports switch
        allSports: false,
      };
    });
  }

  handleSubmit = () => {
    const { onBeforeHook, onClientCancelHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const { maxDistance, allSports, selectedSportIds } = this.state;

    // Pass event up to parent component. onSuccessHook 'disabled'
    // value back to 'false' so that the user can re-submit the form
    onSuccessHook({ maxDistance, allSports, selectedSportIds });
  }

  render() {
    const { sports, disabled } = this.props;
    const { maxDistance, allSports, selectedSportIds } = this.state;

    return [
      <TopLayout key="top">
        <Block>
          <SliderWithText
            minimumValue={0}
            maximumValue={20}
            value={maxDistance}
            onValueChange={this.handleDistanceChange}
            label={I18n.t('spotsFilterScreen.slider.label')}
            description={(
              <Row alignItems="flex-end">
                <Text.SM style={{ color: Colors.gray }}>
                  {I18n.t('spotsFilterScreen.slider.description')}
                </Text.SM>
                <Spacer row size="S" />
                <Text.SM style={{ fontWeight: 'bold' }}>
                  {`${maxDistance.toFixed(1).toString().replace('.0', '')} KM`}
                </Text.SM>
              </Row>
            )}
          />
        </Block>
        <Divider />
        <Block>
          <SwitchWithText
            label={I18n.t('spotsFilterScreen.switch.allSports.label')}
            description={I18n.t('spotsFilterScreen.switch.allSports.description')}
            value={allSports}
            onChange={this.handleAllSportsChange}
          />
        </Block>
        <Divider />
        <Block>
          {sports.map((sport, index) => [
            <SwitchWithText
              key={sport.id}
              label={I18n.t(sport.name)}
              value={selectedSportIds.indexOf(sport.id) !== -1}
              onChange={() => { this.handleSportChange(sport.id); }}
            />,
            // Add spacer after every switch except for the last item
            index < sports.length - 1 && (
              <Spacer
                key={`spacer-${sport.id}`}
                size="XL"
              />
            ),
          ])}
        </Block>
      </TopLayout>,
      <BottomLayout key="bottom">
        <RaisedButton
          variant="default"
          label={I18n.t('spotsFilterScreen.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </BottomLayout>,
    ];
  }
}

SpotsFilterForm.propTypes = {
  sports: PropTypes.arrayOf(propType(sportFragment)).isRequired,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

SpotsFilterForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default SpotsFilterForm;
