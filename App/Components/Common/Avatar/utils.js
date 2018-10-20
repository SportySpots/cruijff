const getInitials = ({ firstName, lastName }) => (
  `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`
);

export default getInitials;

/*
const userToInitials = (user) => {
  if (!user || !user.first_name || !user.last_name) {
    return '?'; // unknown user
  }

  return `${user.first_name.substr(0, 1)}${user.last_name.substr(0, 1)}`;
};

export default userToInitials;

*/
