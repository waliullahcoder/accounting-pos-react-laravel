exports.validateemail = (email) => {
  return email && email.length >= 3;
};

exports.validatePassword = (password) => {
  return password && password.length >= 6;
};
