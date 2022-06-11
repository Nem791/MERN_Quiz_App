const { default: mongoose } = require("mongoose");
var path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const { registerValidation, loginValidation, userValidation } = require("../auth/validation");
const toSlug = require('../utils/vietnamese-slug-converter');

const getUsers = async (req, res) => {
    const users = await User.find();
    console.log(users);

    let username = req.user !== undefined ? req.user : undefined;

    // return res.render("user-list", {
    //     users, username
    // });
    return res.json(users);
};

const getUserById = async (req, res) => {
    // const users = await User.find();
    // const users1 = await User.findById(req.params.id).catch((err) => {
    //   console.log(err);
    // });
    const users = await User.find({ _id: req.params.id }).catch((err) => {
        return null;
    });

    let username = req.user !== undefined ? req.user : undefined;

    // console.log(users1);
    // return res.render("user-list", {
    //     users, username
    // });
    return res.json(users);
};

const registerUser = async (req, res) => {
    // validate info of user
    const { error } = registerValidation(req.body);
    if (error) {
        // return res.status(400).send(error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check email exists in db
    const emailExist = await User.findOne({ email: req.body.email });
    console.log("emailExits", emailExist);
    if (emailExist) {
        return res.status(400).json({
            error: "Email exists in database. Please register with other email",
        });
    }

    // Hash password
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

    const newUser = new User();
    newUser.name = req.body.name;
    console.log(req.body.email);
    newUser.email = req.body.email;
    newUser.password = hashedPassword;
    newUser.gender = req.body.gender;
    newUser.birthday = req.body.birthday;
    console.log(newUser);

    try {
        console.log("gg");
        const user = await newUser.save().then((savedDoc) => {
            // console.log(savedDoc);
            return savedDoc;
        });
        // console.log(user);
        return res.status(200).send({ message: "Register success", status: 200 });
        // res.redirect('/auth/login');
    } catch (error) {
        res.status(400).json(error);
    }
};

const loginUser = async (req, res, next) => {
    var sessData = req.session;
    // res.send(req.body);
    // 1. Validate user info 
    const { error } = loginValidation(req.body);
    if (error) {
        sessData.error = `${error.details[0].message}`;
        return res.status(400).json({ error: error.details[0].message });
        // return res.redirect('back');
    }

    // 2. Check email exists in db 
    const userLogin = await User.findOne({ email: req.body.email });
    console.log('userLogin: ' + userLogin);
    if (!userLogin) {
        // return res.status(400).send('Email not exists in database');
        sessData.error = `Email not exists in database`;
        return res.status(400).json({ error: `Email not exists in database` });
        // return res.redirect('back');
    }

    // 3. Check password 
    const checkPassword = await bcrypt.compare(req.body.password, userLogin.password);
    if (!checkPassword) {
        sessData.error = `Password invalid`;
        return res.status(400).json({ error: `Password invalid` });
        // return res.redirect('back');
        // return res.status(400).send();
    }

    // 4. Return token jwt
    const token = jwt.sign({ _id: userLogin._id, name: userLogin.name, email: userLogin.email }, process.env.SECRET_KEY, { expiresIn: '7d' });


    // 5. Add token to header
    // req.headers['auth-token'] = token;
    // console.log(req.headers['auth-token']);
    // res.set('lol', 't');
    // res.header('auth-token', token);

    // res.header('auth-token', token);

    // res.render('index');
    sessData.auth_token = token;
    sessData.last_login = Date.now();
    // res.redirect('/');
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    return res.json({ token: token, user: decoded })
    // res.status(204).send();
}

const logOutUser = async (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        } else {
            return res.redirect("/");
        }
    });
};

const checkLoginStatus = async (req, res) => {
    let user = req.user !== undefined ? req.user : undefined;

    return res.send(user);
};

const userProfile = async (req, res) => {
    let username = req.user !== undefined ? req.user : undefined;

    console.log(req.params.id);
    // get ID
    const slug = req.params.id.split("-").pop();
    console.log(slug);

    // Tim post theo ID
    const user = await User.findById(slug);
    console.log("user: ", user);
    console.log("username: ", username);

    // return res.render("profile", {
    //     username, user
    // });
    return res.json(user);
};

const updateUser = async (req, res) => {
    let data = req.body;

    // req.user tu Check token middleware 
    let userId = req.user._id;

    // Validate data 
    const { error } = userValidation(data);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
        // return res.redirect('back');
    }

    try {
        // Neu update password => Ma hoa password 
        if (data.password) {
            // Hash password
            const passwordSalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, passwordSalt);
            data.password = hashedPassword;
        }

        // Neu update profile img
        if (req.files) {
            let image = req.files.image;

            // Lay index cua duoi .png, .jpeg, ... 
            const index = image.name.lastIndexOf('.');
            const after = image.name.slice(index);

            // ten anh = ten user + id user . png, jpeg,...
            let username = req.user.name;
            image.name = toSlug(username) + '-' + userId + after;
            console.log(image.name);

            // Luu anh vao public 
            await image.mv(path.join(__dirname, '..', '/public/images/', image.name));
            // cap nhat quiz_img
            data = { ...data, profile_img: '/images/' + image.name };
            console.log("data: ", data);
        }


        // set the new option to true to get the doc that was updated
        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        return res.send(user);

    } catch (error) {
        console.log(error);
        error.error = (error.codeName) ? error.codeName : null;
        return res.send(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    logOutUser,
    userProfile,
    checkLoginStatus,
    updateUser
};
