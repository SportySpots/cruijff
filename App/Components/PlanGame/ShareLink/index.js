import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${Colors.black54};
  height: 64px;
  padding: 8px;
`;
// -----------------------------------------------------------------------------
const Url = styled(Text.M)`
  color: ${Colors.link};
  text-align: center;
`;
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
const ShareLink = ({ link }) => (
  <Container>
    <Url>{link}</Url>
  </Container>
);

ShareLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ShareLink;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Clipboard } from 'react-native';
import styled from 'styled-components';
import config from '../../../config';
import Colors from '../../../Themes/Colors';
import Text from '../../Common/Text';

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Container = styled.View`
  background-color: ${Colors.black54};
  height: 64px;
  padding: 8px;
`;
// -----------------------------------------------------------------------------
const Url = styled(Text.M)`
  color: ${Colors.link};
  text-align: center;
`;
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
const ShareLink extends React.PureComponent {
  get link() {
    const { gameUuid } = this.props;
    return `https://${config.deeplinkHost}/games/${gameUuid}`;
  }

  handleCopy = () => {
    Clipboard.setString(this.link);
  };

  render() {
    return (
      <Container>
        <Url>{this.link}</Url>
      </Container>
    );
  }
};

ShareLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ShareLink;
*/