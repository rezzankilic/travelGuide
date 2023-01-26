const HttpError = require("../models/http-error");


let DUMMY_USERS = [
    {
"userId": "u1",  
"name": "ASHLEY",
"placeCount": 3,
},
{
"userId": "u2",  
"name": "Homes",
"placeCount": 4,
}
]


const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};


const signup = (req, res, next) => {
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(user => user.email === email)
    if( hasUser ){
        throw new HttpError("This email already has an account", 422)
    } else {

    const createdUser = {
        name: name,
        email: email,
        password: password,
    }

    DUMMY_USERS.push(createdUser)
    res.status(201).json({user: createdUser})
}

};

const login = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Coudl not identify user', 401)
    }

    res.json({message: "Logged in!"})

};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;