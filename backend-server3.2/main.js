require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
var cors = require('cors');


const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const DButils = require("./DButils");

var port = process.env.PORT || "8888";
var app = express();

// app.use(cors());
// app.options("*", cors());

const corsConfig = {
    origin: true,
    credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));


app.use(bodyParser.json());
// app.use(cookieParser());

const user = require("./routes/user");
const recipes = require("./routes/recipes");
const profile = require("./routes/profile");

app.use(
    session({
        cookieName: "session", // the cookie key name
        secret: process.env.COOKIE_SECRET, // the encryption key
        duration: 60 * 60 * 1000, // expired after 60 min
        activeDuration: 0, // if expiresIn < activeDuration,
        //the session will be extended by activeDuration milliseconds
        cookie: {
            httpOnly: false, // when true, cookie is not accessible from javascript
        }
    })
);
app.use("/user", user);
app.use("/recipes", recipes);
app.use("/profile", profile);

app.use(function (err, req, res, next) {
    console.error(err);
    // next();
    res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
    if (server) {
        server.close(() => console.log("server closed"));
    }
    process.exit();
});