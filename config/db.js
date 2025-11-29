const mongoose = require("mongoose");

function connectDB() {
  const db_username = process.env.DB_USERNAME;
  const db_password = process.env.DB_PASSWORD;
  const db_name = process.env.DB_NAME;
  const db_url = `mongodb+srv://${db_username}:${db_password}@cluster0.fads9ii.mongodb.net/${db_name}`

  mongoose.connect(db_url)
    .then(() => console.log("DB connected"))
    .catch(err => console.log("Error in DB connection", err));
}

module.exports = connectDB;