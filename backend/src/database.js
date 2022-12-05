const mongoose = require("mongoose");

const URI =
  "mongodb+srv://????@cluster0.qvdqosf.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
