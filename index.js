require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/db");

// DB connection
connectDB();

// middlewares
app.use(express.json());

// Router
const router = require("./routes/router");
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is up at port", PORT);
})