import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "secretKey";

console.log(`SECRET_KEY`);
const users = [
  {
    username: "admin",
    password: "adminPassword",
  },
];

export const loginUser = (req, res) => {
  console.log(req._body);
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password,
  );

  console.log(user);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Username or Password is incorrect",
    });
  } else {
    const accessToken = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: 180000,
    });
    res.status(200).json({
      accessToken,
    });
  }
};
