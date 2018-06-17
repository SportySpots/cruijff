import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import spotFiltersActions from '../../Redux/SpotFiltersRedux';
import { client } from '../../GraphQL/index';
import GET_SPORTS from '../../GraphQL/Sports/Queries/GET_SPORTS';
import DefaultButton from '../../Components/DefaultButton';
import SpotsFilter from '../../Components/Spots/SpotsFilter';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------

const ButtonContainer = styled.View`
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    // Get data from redux
    const { maxDistance, allSports, selectedSportIds } = props;

    this.state = {
      maxDistance: maxDistance || 3,
      sports: [],
      allSports: allSports || false,
      selectedSportIds: selectedSportIds || [], // list of selected sport ids
      loaded: false,
      disabled: false,
    };
    this.init();
  }

  init = async () => {
    const result = await client.query({ query: GET_SPORTS });
    const { sports } = result.data;
    this.setState({
      sports,
      loaded: true,
    });
  }

  handleSliderChange = (maxDistance) => {
    this.setState({ maxDistance });
  }

  handleSportsFilterSwitch = (allSports) => {
    this.setState({
      allSports,
      selectedSportIds: allSports
        ? this.state.sports.map(({ id }) => (id))
        : [],
    });
  }

  handleSportSwitch = (sportId) => {
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
        allSports: (prevState.allSports && index !== -1)
          ? false
          : prevState.allSports,
      };
    });
  }

  handleSubmit = () => {
    const {
      navigation,
      setMaxDistance,
      setAllSports,
      setSports,
    } = this.props;

    const {
      maxDistance,
      allSports,
      selectedSportIds,
    } = this.state;

    this.setState({ disabled: true });

    // Save data into redux store.
    setMaxDistance(maxDistance);
    setAllSports(allSports);
    setSports(selectedSportIds);

    // Go back to spots screen
    navigation.goBack(null);

    this.setState({ disabled: false });
  }

  render() {
    const {
      maxDistance,
      allSports,
      sports,
      selectedSportIds,
      loaded,
      disabled,
    } = this.state;

    if (!loaded) {
      return null;
    }

    return [
      <Container key="filters">
        <SpotsFilter
          // SliderFilter props
          maxDistance={maxDistance}
          onSliderChange={this.handleSliderChange}
          // SwitchFilter props
          allSports={allSports}
          sports={sports}
          selectedSportIds={selectedSportIds}
          onSportsFilterSwitch={this.handleSportsFilterSwitch}
          onSportSwitch={this.handleSportSwitch}
        />
      </Container>,
      <ButtonContainer key="button">
        <DefaultButton
          bgColor={this.disabled ? Colors.gray : Colors.actionYellow}
          textColor={Colors.white}
          text={I18n.t('View spots')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </ButtonContainer>,
    ];
  }
}

SpotsFilterScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.spotFilters;
const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.setMaxDistance,
  setAllSports: spotFiltersActions.setAllSports,
  setSports: spotFiltersActions.setSports,
};
const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(SpotsFilterScreen);
