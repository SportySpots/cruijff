import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import themeImages from '../../../Themes/Images';
import Text from '../Text';
import { userToInitials, convertS3ToImgix } from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DEFAULT_AVATAR_SIZE = 40;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${({ size }) => (size)};
  height: ${({ size }) => (size)};
  border-radius: ${({ size }) => (size)};
  background-color: ${({ bgColor }) => (bgColor || Colors.primaryGreen)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  width: ${({ size }) => (size)};
  height: ${({ size }) => (size)};
`;
//------------------------------------------------------------------------------
const Initials = styled(Text.M)`
  font-size: ${({ size }) => (size * (18 / 40))}px;
  padding: 4px;
  text-align: center;
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Avatar extends React.PureComponent {
  static size = () => DEFAULT_AVATAR_SIZE

  render() {
    const { user, text, size } = this.props;

    const avatar = (
      user
      && user.profile
      && user.profile.avatar
      && user.profile.avatar.length > 0
    ) ? user.profile.avatar : '';

    // console.log('avatar', avatar);
    // console.log('converted', convertS3ToImgix({ image: avatar, height: size, width: size }));

    if (avatar) {
      return (
        <Circle size={size}>
          <StyledImage
            source={{ uri: convertS3ToImgix({ image: avatar, height: size, width: size }) }}
            size={size}
          />
        </Circle>
      );
    }

    const hasName = (
      user
      && user.first_name
      && user.first_name.trim().length > 0
      && user.last_name
      && user.last_name.trim().length > 0
    );

    if (hasName) {
      return (
        <Circle size={size}>
          <Initials size={size}>
            {userToInitials(user)}
          </Initials>
        </Circle>
      );
    }

    if (text && text.trim().length > 0) {
      return (
        <Circle size={size}>
          <Text.SM style={{ color: Colors.white }}>
            {text}
          </Text.SM>
        </Circle>
      );
    }

    // If no user and no text, display default avatar
    return (
      <Circle bgColor={Colors.transparent} size={size}>
        <StyledImage
          source={themeImages.spotOpenCircle}
          size={size}
        />
      </Circle>
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile: PropTypes.shape({
      avatar: PropTypes.string,
    }),
  }),
  text: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  user: null,
  text: '',
  size: DEFAULT_AVATAR_SIZE,
};

export default Avatar;
