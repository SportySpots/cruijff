import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { client } from '../../GraphQL/index';
import spotFiltersActions from '../../Redux/SpotFiltersRedux';
import GET_SPORTS from '../../GraphQL/Sports/Queries/GET_SPORTS';
import SpotsFilter from '../../Components/Spots/SpotsFilter';

class SpotsFilterScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      selectedSportIds: [], // list of selected sport ids
      loaded: false,
    };
    this.init();
  }

  init = async () => {
    const result = await client.query({ query: GET_SPORTS });
    const { sports } = result.data;
    this.setState({
      sports,
      // By default, set all sports as 'selected'
      selectedSportIds: sports.map(({ uuid }) => (uuid)),
      loaded: true,
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
      };
    });
  }

  handleSubmit = () => {
    // TODO: store data into redux store
  }

  render() {
    const { maxDistance, setMaxDistance } = this.props;
    const { sports, selectedSportIds, loaded } = this.state;

    if (!loaded) {
      return null;
    }

    // TODO: pass sports and selectedSportIds
    return (
      <SpotsFilter
        // SliderFilter props
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        // SwitchFilter props
        sports={sports}
        selectedSportIds={selectedSportIds}
        onSportSwitch={this.handleSportSwitch}
      />
    );
  }
}

SpotsFilterScreen.propTypes = {
  maxDistance: PropTypes.number.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  toggleSport: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.spotFilters;
const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.setMaxDistance,
  toggleSport: spotFiltersActions.toggleSport,
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);
export default withRedux(SpotsFilterScreen);

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import spotFiltersActions from '../../Redux/SpotFiltersRedux';
import GET_SPORTS from '../../GraphQL/Sports/Queries/GET_SPORTS';
import Text from '../../Components/Text';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';
import SpotsFilter from '../../Components/Spots/SpotsFilter';

const SpotsFilterScreen = ({
  maxDistance,
  setMaxDistance,
  toggleSport,
}) => (
  <Query query={GET_SPORTS}>
    {({ loading, error, data }) => {
      if (loading) return <CenteredActivityIndicator />;
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>;

      return (
        <SpotsFilter
          maxDistance={maxDistance}
          sports={(data && data.sports) || []}
          setMaxDistance={setMaxDistance}
          toggleSport={toggleSport}
        />
      );
    }}
  </Query>
);

SpotsFilterScreen.propTypes = {
  maxDistance: PropTypes.number.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  toggleSport: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.spotFilters;
const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.setMaxDistance,
  toggleSport: spotFiltersActions.toggleSport,
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);
export default withRedux(SpotsFilterScreen);
*/

/*
import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Text from '../../Components/Text';
import Colors from '../../Themes/Colors';
import Slider from '../../Components/Slider';
import I18n from '../../I18n/index';
import { client } from '../../GraphQL/index';
import spotFiltersActions from '../../Redux/SpotFiltersRedux';

const Container = styled.ScrollView`
  flex: 1;
`;

const FilterLabel = styled(Text.M)`

`;

const FilterDescription = styled(Text.SM)`
  color: ${Colors.gray};
`;

const FilterGroup = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray};
  padding-horizontal: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-vertical: 8px;
`;

const RowVertical = Row.extend`
  flex-direction: column;
  flex: 1;
`;

const Left = styled.View`
  flex: 1;
`;

const Right = styled.View`
  width: 48px;
`;

const SwitchFilter = ({
  label, description, value, onChange,
}) => (
  <Row>
    <Left>
      <FilterLabel>{label}</FilterLabel>
      <FilterDescription>{description}</FilterDescription>
    </Left>
    <Right>
      <Switch value={value} onValueChange={() => onChange(!value)} />
    </Right>
  </Row>
);

SwitchFilter.propTypes = {
  value: propTypes.bool.isRequired,
  onChange: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};

const SliderFilter = ({
  max, min, value, onChange, label, description,
}) => (
  <RowVertical>
    <FilterLabel>{label}</FilterLabel>
    <FilterDescription>{description}</FilterDescription>
    <Slider
      value={(value / (max - min))}
      onChange={val => onChange(val * (max - min))}
    />
  </RowVertical>
);

SliderFilter.propTypes = {
  max: propTypes.number.isRequired,
  min: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};

class SpotsFilterScreen extends React.Component {
  static propTypes = {
    maxDistance: propTypes.number.isRequired,
    setMaxDistance: propTypes.func.isRequired,
    sports: propTypes.object.isRequired,
    toggleSport: propTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      loaded: false,
      sports: [],
    };
    this.init();
  }

  async init() {
    const result = await client.query({
      query: gql`
        {
          sports {
            uuid
            name
          }
        }
      `,
    });

    this.setState({ loaded: true, sports: result.data.sports });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <Container>
        <FilterGroup>
          <SliderFilter
            value={this.props.maxDistance}
            max={20.0}
            min={0.0}
            onChange={(value) => { this.props.setMaxDistance(value); }}
            label={I18n.t('Distance')}
            description={`max distance: ${this.props.maxDistance.toFixed(1)}km`}
          />
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Sports</FilterLabel>
          {this.state.sports.map(sport => (
            <SwitchFilter
              key={sport.uuid}
              description={sport.name}
              label=""
              value={typeof this.props.sports[sport.uuid] === 'undefined' ? true : this.props.sports[sport.uuid]}
              onChange={() => this.props.toggleSport(sport.uuid)}
            />
          ))}
        </FilterGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => state.spotFilters;
const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.setMaxDistance,
  toggleSport: spotFiltersActions.toggleSport,
};

const withRedux = connect(mapStateToProps, mapDispatchToProps);
export default withRedux(SpotsFilterScreen);
*/
