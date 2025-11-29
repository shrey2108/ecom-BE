const api = require("../utils/api");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if(!token) return api.error(res, "No token provided", "Unauthorized", 401);

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if(!user){
      return api.error(res, "Invalid token", "Unauthorized", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    api.error(res, error.message);
  }
}

module.exports.isSeller = (req, res, next) => {
  try {
    if (!req.user) {
      return api.error(res, "Unauthorized", "User not authenticated", 401);
    }

    if (req.user.role !== "seller") {
      return api.error(res, "Forbidden", "Only sellers can perform this action", 403);
    }

    next();
  } catch (error) {
    return api.error(res, "Internal Server Error", error.message, 500);
  }
};
