import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

const users = [
  {
    username: "admin",
    password: "adminPassword",
  },
];

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (user) {
    const accessToken = jwt.sign({ username }, SECRET_KEY);
    return res.status(200).json({
      accessToken,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Username or Password is incorrect",
    });
  }
};

export const verityJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(`Auhtos: ${authHeader}`);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
