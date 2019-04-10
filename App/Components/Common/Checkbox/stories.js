import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Checkbox from '.';

const Box = styled.View`
  height: 180px;
  border: 1px solid black;
  background-color: green;
`;

class Container extends React.PureComponent {
  state = {
    checked: false,
  }

  render() {
    const { theme } = this.props;
    const { checked } = this.state;

    return (
      <Box>
        <Checkbox
          theme={theme}
          checked={checked}
          onPress={() => {
            this.setState({ checked: !checked });
          }}
        />
      </Box>
    );
  }
}

Container.propTypes = {
  theme: PropTypes.string,
};

Container.defaultProps = {
  theme: 'black',
};

storiesOf('Common.Checkbox', module)
  .add('Checkbox', () => <Container />)
  .add('Checkbox white theme', () => (
    <Container theme="white" />
  ));
