require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/db");

// DB connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is live"
  })
})

// Router
const router = require("./routes/router");
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is up at port", PORT);
})