import { auth } from "express-oauth2-jwt-bearer";

const advancedAuth = auth({
  audience: "https://book-store-api",
  issuerBaseURL: `https://dev-dmi4xrevd2edct4e.eu.auth0.com/`,
});

const logAuth = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  next();
};

// Error handling middleware for token validation issues
const handleAuthErrors = (err, req, res, next) => {
  if (err) {
    console.error("Authorization Error:", err.message);
    return res.status(401).send({ message: "Invalid token provided!" });
  }
  next();
};

export default [logAuth, advancedAuth, handleAuthErrors];
