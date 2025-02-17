const mongoose = require("mongoose");

 function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.error("DB connection error:", error));
}

module.exports = connectToDB;
