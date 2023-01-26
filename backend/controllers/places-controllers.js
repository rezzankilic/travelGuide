
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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
      creator: 'u1'
    }
  ];


const getPlaceById = 
(req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(place => {
        return placeId === place.id
    });
    console.log("get request in place");
    

    if(!place){
        throw error = new HttpError('Could not find a places for provided id.', 404);
    } else {
        res.json({place: place});
    }
}


const getPlacesByUserId = 
    (req, res, next) => {
        const creatorid = req.params.uid;
        const userPlaces = DUMMY_PLACES.filter(userplace => {
            return creatorid === userplace.creator  
        })
    
        if(!userPlaces || userPlaces.length == 0){
            return next(HttpError('Could not find a place for provided user id.', 404));
        } else {
            
        res.json({userPlaces: userPlaces});
        }
    
    };


const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator}= req.body;
    const createdPlace = {
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator,
    };
    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({place: createdPlace})
};

const updatePlace = (req, res, next) => {
    const {title, description}= req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex( place => place.id === placeId );
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});

};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter( place => place.id !== placeId);
    res.status(200).json({message: "OBject deleted."});

};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;