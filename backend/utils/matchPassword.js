const bcrypt = require("bcryptjs");

const matchPassword = async (enteredPassword, password) => {
  if (await bcrypt.compare(enteredPassword, password)) {
    return true;
  } else {
    return false;
  }
};

module.exports = matchPassword;
