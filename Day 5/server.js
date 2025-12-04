const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
