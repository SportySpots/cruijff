import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const THRESHOLD = 120;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Trigger = styled(Text.SM)`
  color: ${Colors.actionYellow}
  text-decoration-line: underline;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DescriptionReadMore extends React.PureComponent {
  state = {
    expanded: false,
  }

  triggerExpanded = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { description } = this.props;
    const { expanded } = this.state;

    const { length } = description;

    if (length <= THRESHOLD) {
      return (
        <View>
          <Text.SM>{description}</Text.SM>
        </View>
      );
    }

    const visibleDescription = expanded ? description : `${description.slice(0, THRESHOLD)}...`;

    return (
      <View>
        <Text.SM>{visibleDescription}</Text.SM>
        <Spacer size="M" />
        <TouchableOpacity onPress={this.triggerExpanded}>
          <Trigger>{I18n.t(`Read ${expanded ? 'less' : 'more'}`)}</Trigger>
        </TouchableOpacity>
      </View>
    );
  }
}

DescriptionReadMore.propTypes = {
  description: PropTypes.string,
};

DescriptionReadMore.defaultProps = {
  description: '',
};

export default DescriptionReadMore;
