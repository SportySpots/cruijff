import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import SliderWithText from '../../Common/SliderWithText';
import SwitchWithText from '../../Common/SwitchWithText';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce TopBottomLayout to hold body and button container
const Top = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
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
    const { onBeforeHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
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
      <Top key="top">
        <Block>
          <SliderWithText
            minimumValue={0}
            maximumValue={20}
            value={maxDistance}
            onValueChange={this.handleDistanceChange}
            label={I18n.t('Location')}
            description={(
              <Row alignItems="flex-end">
                <Text.SM style={{ color: Colors.gray }}>
                  {I18n.t('Shows spots inside')}:
                </Text.SM>
                <Spacer orientation="row" size="S" />
                <Text.SM style={{ fontWeight: 'bold' }}>
                  {maxDistance.toFixed(1).toString().replace('.0', '')} KM
                </Text.SM>
              </Row>
            )}
          />
        </Block>
        <Divider />
        <Block>
          <SwitchWithText
            label={I18n.t('All sports')}
            description={I18n.t('Filter on type of sport')}
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
                orientation="column"
                size="XL"
              />
            ),
          ])}
        </Block>
      </Top>,
      <Bottom key="bottom">
        <RaisedButton
          status="default"
          label={I18n.t('View spots')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Bottom>,
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
  onSuccessHook: PropTypes.func,
};

SpotsFilterForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onSuccessHook: () => {},
};

export default SpotsFilterForm;
