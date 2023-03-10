require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const agentRoutes = require("./routes/agentRoutes");
const filtersRoutes = require("./routes/filtersRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes

app.use("/api/user", agentRoutes);

app.use("/api/filters", filtersRoutes);
app.use("/api/ticket", ticketRoutes);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listen on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
