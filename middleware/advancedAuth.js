import { auth } from "express-oauth2-jwt-bearer";

const advancedAuth = auth({
  audience: "https://book-store-api", // e.g. https://book-store-api
  issuerBaseURL: `https://dev-dmi4xrevd2edct4e.eu.auth0.com/`,
});

export default advancedAuth;
