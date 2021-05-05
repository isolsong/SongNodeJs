const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./src/db/mongodb.js")();
app.use(require("./routes/upload"));

// const uri =
//   "mongodb+srv://dbSong:dbSong@cluster0.rfrya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to DB");
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
