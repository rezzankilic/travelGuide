const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const User = require('../models/user')





const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('fetching users failedd, try later', 500);
        return next(error)
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))})
    
};


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError('please write validated inputs', 422))
    }
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    } catch (err) {
        const error = new HttpError('Signing up faiiiled, please try again', 500 )
        return next(error)
    }

    if(existingUser){
        const error = new HttpError('user existed alreadyy. Please login again', 422 );
        return next(error)
    } 



    const createdUser = new User ({
        name:name,
        email: email,
        image: 'https://www.pexels.com/photo/redhead-woman-in-coat-14846068/',
        password: password,
        places: []
    })

    try{
        await createdUser.save();
    } catch(err){
        const error = new HttpError('Signing up failed, Userr', 500);
        console.log(err)
        return next(error);
    };
    res.status(201).json({user: createdUser.toObject({ getters: true })})
};


const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email: email})
    } catch (err) {
        const error = new HttpError('Logging in faiiiled, please try again', 500 )
        return next(error)
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('invalid credentiaLS, could not login.', 401 );
        return next(error)
    } 

    res.json({message: "Logged in!", user: existingUser.toObject({ getters: true})})

};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;