var express = require("express");
var router = express.Router();
//var path = require("path");
//var logger = require("morgan");
const session = require("client-sessions");
const DButils = require("../DButils");
const bcrypt = require("bcrypt");



router.post("/register",async (req, res, next) => {
    try{
        const users = await DButils.execQuery('SELECT user_name FROM dbo.users');
        //let test = req.body.username;
        if (users.find((x) => x.user_name === req.body.username))
            throw { status: 409, message: "Username already exists" };
        let hash_password = bcrypt.hashSync(req.body.password, parseInt(process.env.bcrypt_saltRounds));
        await DButils.execQuery(
            `INSERT INTO dbo.users VALUES (default, '${req.body.username}', '${req.body.firstName}',
        '${req.body.lastName}','${req.body.country}','${hash_password}', '${req.body.email}', '${req.body.profilePicture}')`
        );
        res.status(200).send({ message: "user created", success: true });
    }
    catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        // check that username exists
        const users = await DButils.execQuery('SELECT user_name FROM users');
        if (!users.find((x) => x.user_name === req.body.username))
            throw { status: 400, message: "Username or Password incorrect" };

        // check that the password is correct
        const user = (await DButils.execQuery(`SELECT * FROM users WHERE user_name = '${req.body.username}'`))[0];

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            throw { status: 400, message: "Username or Password incorrect" };
        }

        // Set cookie
        req.session.id = user.user_id;
        //req.session.save();
        //res.cookie(session_options.cookieName, user.user_id, cookies_options);

        // return cookie
        res.status(200).send({ message: "login succeeded", success: true });
    } catch (error) {
        next(error);
    }
});
router.post("/logout", function (req, res) {
    req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
    res.send({ message: "logout succeeded" ,success: true, });
});




module.exports = router;
