import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components';
import Text from '../Components/Text';
import Colors from '../Themes/Colors';
import Slider from '../Components/Slider';
import I18n from '../I18n';
import withQuery from '../GraphQL/withQuery';
import gql from 'graphql-tag';

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

const SwitchFilter = ({label, description}) => (
  <Row>
    <Left>
      <FilterLabel>bladiebla</FilterLabel>
      <FilterDescription>Basdasdsda da sd asd</FilterDescription>
    </Left>
    <Right>
      <Switch />
    </Right>
  </Row>
);

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


class FilterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      maxDistance: 1.0,
    };
  }
  render() {
    const Contents = withQuery(gql`
    {
      sports {
        uuid
        name
      }
    }
  `)(({ data }) => (
    <Container>
      <FilterGroup>
        <SliderFilter
          value={this.state.maxDistance}
          max={20.0}
          min={0.0}
          onChange={(value) => { this.setState({ maxDistance: value }); }}
          label={I18n.t('Distance')}
          description={`max distance: ${this.state.maxDistance.toFixed(1)}km`}
        />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
        <SwitchFilter />
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
        <SwitchFilter />
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
        <SwitchFilter />
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
        <SwitchFilter />
        <SwitchFilter />
      </FilterGroup>
      <FilterGroup>
        <SwitchFilter />
      </FilterGroup>
    </Container>
    ));

    return <Contents />;
  }
}

export default FilterScreen;
