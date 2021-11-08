const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userControllers/userRetrive.js");
const userAuthApis = require("./routes/userControllers/userAuthApis");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("api/login", userAuthApis);
userAuthApis(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on  http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});
