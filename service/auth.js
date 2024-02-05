//const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secert = "Sparsh@123";
function setUser(user) {
  // sessionIdToUserMap.set(id, user);

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secert
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    const decodedUser = jwt.verify(token, secert);
    return decodedUser;
  } catch (error) {
    // Handle JWT verification errors
    console.error("JWT verification error:", error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
