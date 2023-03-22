const express = require("express");
// const path = require("path");

const userRoutes = require("./routes/user");
const clientRoutes = require("./routes/client");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/auth", userRoutes);
app.use("/", clientRoutes);

module.exports = app;