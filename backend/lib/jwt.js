const jwt = require("jsonwebtoken");

const createJwtToken = (user) => {
  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(userData, process.env.JWT_SECRET);
};

// TASK 12. Block unauthenticated users
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(403).json({ error: "Forbidden" });
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = {
  createJwtToken,
  verifyToken,
};
