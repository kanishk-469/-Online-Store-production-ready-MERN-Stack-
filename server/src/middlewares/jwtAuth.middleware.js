import jwt from "jsonwebtoken";
export const jwtAuth = (req, res, next) => {
  // 1. Read the token
  const authToken = req.headers["authorization"];
  // console.log(authToken);

  //2. if no token return error
  if (!authToken) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  //3. check/verify if token is valid
  try {
    const payload = jwt.verify(authToken, process.env.JWT_SECRET);

    req.userId = payload.userId;
    req.role = payload.role;
    // req.email = payload.email;

    // console.log(payload);
  } catch (err) {
    //4. return error
    console.log(err);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  //5. call next middleware
  next();
};
