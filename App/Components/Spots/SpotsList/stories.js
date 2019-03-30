import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Block from '../../Common/Block';
import SpotsList from '.';

class Container extends React.PureComponent {
  state = {
    selectedSpot: null,
  }

  render() {
    const { cardComponent, sportsIds } = this.props;
    const { selectedSpot } = this.state;

    return (
      <Block bgColor="silver">
        <SpotsList
          cardComponent={cardComponent}
          sportsIds={sportsIds}
          selectedSpot={selectedSpot}
          onCardPress={(spot) => {
            this.setState({ selectedSpot: spot });
          }}
        />
      </Block>
    );
  }
}

Container.propTypes = {
  cardComponent: PropTypes.oneOf(['SpotListCard', 'SpotListCardSmall']).isRequired,
  sportsIds: PropTypes.arrayOf(PropTypes.string),
  // Plus all FlatList native props
};

Container.defaultProps = {
  sportsIds: [],
};

storiesOf('Spots.SpotsList', module)
  .add('SpotsList small card', () => (
    <Container cardComponent="SpotListCardSmall" />
  ))
  .add('SpotsList big card', () => (
    <Container cardComponent="SpotListCard" />
  ));
