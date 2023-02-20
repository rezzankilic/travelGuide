const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('user existed alreadyy. Please login again', 422 );
        return next(error);
    } 


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err){
        const error = new HttpError('Coulnor create user, try again with password', 500);
        return next(error);
    }
    

    const createdUser = new User ({
        name:name,
        email: email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    })

    try{
        await createdUser.save();
    } catch(err){
        const error = new HttpError('Signing up failed, Userr', 500);
        console.log(err)
        return next(error);
    };


    let token;
    try{
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email}, 'supersecret_dontshare', {expiresIn: '1h'})
    } catch(err) {
        const error = new HttpError('Signing up faiiiled, please try again-token', 500 )
        return next(error);
    }
    

    res.status(201).json({ userIs: createdUser.id, email: createdUser.email, token: token})
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

    if(!existingUser){
        const error = new HttpError('invalid credentiaLS, could not login.', 401 );
        return next(error)
    } 

    let isValidPassword = false;
    try{
        isValidPassword = bcrypt.compare(password, existingUser.password);
    } catch (err){
        const error = new HttpError('Couldn log you in please check you credentials and try again pasword valid.', 500);
        return next(error);
    }

    if(!isValidPassword) {
        const error = new HttpError('invalid credentiaLS, could not login.', 401 );
        return next(error)
    }

    let token;
    try{
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email}, 'supersecret_dontshare', {expiresIn: '1h'})
    } catch(err) {
        const error = new HttpError('Login faiiiled, please try again-token', 500 )
        return next(error);
    } 
    

    res.json({userId: existingUser.id, email: existingUser.email, token: token })

};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;