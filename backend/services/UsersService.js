const database = require("../database");

const getByFacebookOrCreate = async (facebookId, facebookProfile) => {
  const user = await database.query("SELECT * FROM users WHERE fb_id = $1", [
    facebookId,
  ]);

  if (user.rows.length) {
    return user.rows[0];
  }

  const newUser = await database.query(
    "INSERT INTO users (fb_id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      facebookId,
      `${facebookProfile.name.givenName} ${facebookProfile.name.familyName}`,
      `${facebookId}@facebook.com`,
      "password",
      "customer",
    ]
  );

  return newUser.rows[0];
};

const getByGoogleOrCreate = async (googleId, googleProfile) => {
  const user = await database.query(
    "SELECT * FROM users WHERE google_id = $1",
    [googleId]
  );

  if (user.rows.length) {
    return user.rows[0];
  }

  const newUser = await database.query(
    "INSERT INTO users (google_id, name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      googleId,
      googleProfile.displayName,
      googleProfile.emails[0].value,
      "password",
      "customer",
    ]
  );

  return newUser.rows[0];
};

const getByEmail = async (email) => {
  const user = await database.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length) {
    return user.rows[0];
  }

  return null;
};

const getAllSortedBy = async (sortBy = "id", sortDirection = "ASC") => {
  const users = await database.query(
    `SELECT * FROM users ORDER BY ${sortBy} ${sortDirection}`
  );

  return users.rows;
};

module.exports = {
  getByFacebookOrCreate,
  getByEmail,
  getByGoogleOrCreate,
  getAllSortedBy,
};
