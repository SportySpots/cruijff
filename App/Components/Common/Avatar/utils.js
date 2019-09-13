export const userToInitials = (user) => {
  if (!user || !user.name) {
    return '?'; // unknown user
  }
  const splitName = user.name.split(' ');
  if (splitName.length > 1) {
    // return first letters of first and last word
    return `${splitName[0].substr(0, 1)}${splitName[splitName.length - 1].substr(0, 1)}`;
  }
  return user.name.substr(0, 2);
};

export const convertS3ToImgix = ({ image, height, width }) => (
  image.startsWith('https://sportyspots-prd.s3.amazonaws.com')
    ? image.replace('https://sportyspots-prd.s3.amazonaws.com', 'https://sportyspots.imgix.net')
      .concat('?auto=compress')
      // .concat(height ? `&h=${height}` : '')
      .concat(width ? `&w=${width}` : '')
      // .concat('&fm=png&fit=facearea&faceindex=1&facepad=2.5&usm=20')
      // .concat('&fm=png&fit=facearea&facepad=5&usm=20')
      // .concat('&fm=png&fit=facearea&facepad=6')
    : image
);

const SMALL_AVATAR_SIZE = 40;
const LARGE_AVATAR_SIZE = 80;

export const getSize = (size) => {
  if (!size || !['S', 'L'].includes(size)) {
    throw new Error('Size is required');
  }
  return size === 'S' ? SMALL_AVATAR_SIZE : LARGE_AVATAR_SIZE;
};
