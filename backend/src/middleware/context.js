import jwt from "jsonwebtoken";
// import { JWT_SECRET_KEY } from "../Configuration/config.js";
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
    return { userId };
  }
};

export { context };
