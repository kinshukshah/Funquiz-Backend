const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {DBConnect}=require("./dbConnect/db.connect.js");

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

DBConnect();


app.get('/', (req, res) => {
  res.send('Welcome to Funquiz Backend!')
});

app.use("/api/quiz", require("./routes/quiz.route.js"));
app.use("/api/user", require("./routes/user.route.js"));



app.listen(port, () => {
  console.log('server started');
});