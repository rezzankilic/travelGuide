const express = require('express');

const router = express.Router();


const DUMMY_USERS = [
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



router.get('/:uid', (req, res, next) => {
    const userid = req.params.uid;
    const user = DUMMY_USERS.find(user => {
        return user.userId === userid
    })

    res.json({user: user})

    console.log('has requested');
})



module.exports= router;
