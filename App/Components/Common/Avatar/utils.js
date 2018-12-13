export const userToInitials = (user) => {
  if (!user || !user.first_name || !user.last_name) {
    return '?'; // unknown user
  }

  return `${user.first_name.substr(0, 1)}${user.last_name.substr(0, 1)}`;
};

export const convertS3ToImgix = ({ image, height, width }) => (
  image.startsWith('https://sportyspots-prd.s3.amazonaws.com')
    ? image.replace('https://sportyspots-prd.s3.amazonaws.com', 'http://sportyspots.imgix.net')
      .concat('?auto=compress')
      // .concat(height ? `&h=${height}` : '')
      .concat(width ? `&w=${width}` : '')
      // .concat('&fm=png&fit=facearea&faceindex=1&facepad=2.5&usm=20')
      // .concat('&fm=png&fit=facearea&facepad=5&usm=20')
      // .concat('&fm=png&fit=facearea&facepad=6')
    : image
);
