import Config from 'react-native-config';

const getImageUrl = image => (
  image.startsWith('http') ? image : `${Config.SEEDORF_HOST}${image}`
);

export default getImageUrl;
