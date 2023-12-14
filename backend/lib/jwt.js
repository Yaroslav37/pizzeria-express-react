const jwt = require("jsonwebtoken");

const createJwtToken = (user) => {
  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = createJwtToken;
