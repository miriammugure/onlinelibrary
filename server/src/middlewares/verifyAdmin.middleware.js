import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  // console.log(accessToken)
  // res.send(accessToken)
  if (!accessToken) {
    return res.status(401).json({ success: false, message: "unathorized" });
  }
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "unathorized" });
    }
    //  console.log(decoded)
    if (decoded.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "you cannot perfom such actions" });
    }
    next();
  });
};
