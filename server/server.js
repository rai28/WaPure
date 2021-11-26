const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userControllers/userRetrive.js");
const userAuthApis = require("./routes/userControllers/userAuthApis");
const reportRouter = require("./routes/reportRouter");
const paypalClientId = require("./config/keys").paypalClientId;
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
app.use("/api/reports", reportRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(paypalClientId);
});

app.get("/", (req, res) => {
  res.send("The app is working.");
});

userAuthApis(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on  http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});
