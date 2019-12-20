
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookierParser = require("cookie-parser");
const path = require("path");

//ROUTES
const citydb = require("./routes/api/citydb");
const itinerarydb = require("./routes/api/itinerarydb");
const activitydb = require("./routes/api/activitydb");
const commentdb = require("./routes/api/commentdb");
const cmsdb = require("./routes/api/cmsdb");
const profiledb = require("./routes/api/profiledb");
const usersdb = require("./routes/api/usersdb");
require("./models/usermodel");

// CONNECT TO MONGODB
mongoose
  .connect('mongodb+srv://szuviria:murcielago2017@mytinerary-n5rll.mongodb.net/MYtinerary?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EXPRESS & PORT CONFIG
// ==============================================
const app = express();

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// API ROUTES
app.use("/api", citydb);
app.use("/api", itinerarydb);
app.use("/api", activitydb);
app.use("/api", commentdb);
app.use("/api", cmsdb);

// EXPRESS MIDDLWARE
app.use(cookierParser());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// AUTH ROUTES
app.use("/auth", usersdb);
app.use("/auth", profiledb);

//PASSPORT CONFIG
require("./config/passport")(passport);
// require("./config/passportGoogle")(passport);

// Serve Static assets if in production


const PORT = 5000;

// START THE SERVER
// =============================================
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
