require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routers/user");
const todoRoutes = require("./routers/todo");

  app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongo DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Working on Port", process.env.PORT);
    });
  })
  .catch((er) => {
    console.log("Error", er);
  });
