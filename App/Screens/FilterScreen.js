import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components';
import Text from '../Components/Text';
import Colors from '../Themes/Colors';
import Slider from '../Components/Slider';

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

const Filter = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 8px;
`;

const Left = styled.View`
  flex: 1;
`;

const Right = styled.View`
  width: 48px;
`;

const SwitchFilter = () => (
  <Filter>
    <Left>
      <FilterLabel>bladiebla</FilterLabel>
      <FilterDescription>Basdasdsda da sd asd</FilterDescription>
    </Left>
    <Right>
      <Switch />
    </Right>
  </Filter>
);

// const SliderFilter


class FilterScreen extends React.Component {
  render() {
    return (
      <Container>
        <FilterGroup>
          <Slider/>
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
    );
  }
}

export default FilterScreen;
