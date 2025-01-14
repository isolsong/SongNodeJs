const express = require("express");
const app = express();

const { Bars } = require("./models/billing.queries");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
