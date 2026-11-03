require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const userRouter = require("./Routers/user");
const applicationRouter = require("./Routers/application");
const port = 4000;

connection();
app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/applications", applicationRouter);
app.get("/", (req, res) => {
  res.send("Job Application Tracker API is running....");
});

app.listen(port, () => {
  console.log("Connecting to server......");
  console.log(`Server now listening on port ${port}`);
  console.log(`Now you can run localhost:${port} and see a message`);
});
