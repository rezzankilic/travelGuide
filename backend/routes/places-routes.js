const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Em State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u2'
    }
  ];

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(place => {
        return placeId === place.id
    });
    console.log("get request in place");
    

    if(!place){
        const error = new Error('Could not find a place for provided id.');
        error.code = 404;
        throw error;
    } else {
        res.json({place: place});
    }
})


router.get('/user/:uid', (req, res, next) => {
    const creatorid = req.params.uid;
    const userPlaces = DUMMY_PLACES.find(userplace => {
        return creatorid === userplace.creator  
    })

    if(!userPlaces){
        const error = new Error('Could not find a place for provided user id.');
        error.code = 404;
        return next(error);
    } else {
        
    res.json({userPlaces: userPlaces});
    }

})

module.exports = router;
