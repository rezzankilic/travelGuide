
const HttpError = require("../models/http-error");
const { validationResult } = require('express-validator')
const Place = require('../models/place');
const User = require('../models/user');
const  mongoose = require("mongoose");


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;

    try{
      place = await Place.findById(placeId);
    } catch(err){
      const error = new HttpError('cannot get place by id', 404);
      return next(error);
    }
    console.log("get request in place");
    

    if(!place){
        const error = new HttpError('Could not find a places for provided id.', 404);
        return next(error);
    }
        res.json({place: place.toObject({getters: true})});
};


const getPlacesByUserId = async (req, res, next) => {
        const userId = req.params.uid;
        let places;

        try{
        places = await Place.find({creator: userId});
        } catch (err) {
          const error = new HttpError('could not get place from backend, fetching problem', 500);
          return next(error)
        }


        if(!places || places.length == 0){
            const error =  new HttpError('Could not find a place for provided user id.', 404);
            return next(error);
        } else {
            
        res.json({places : places.map(place => place.toObject({ getters: true}))});
        }
    
    };


const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      console.log(errors)
      return next( new HttpError('invalid inputs passed, please check your date', 422));
    }

    const {title, description, location, address, creator}= req.body;
    const createdPlace = new Place ({
      title: title,
      description: description,
      image:'https://upload.wikimedia.org/wikipedia/commons/4/45/Liberty02.jpg',
      address: address,
      location: {
        lat: location.lat,
        lng: location.lng
      },
      creator: creator
    });


    let user;

    try{
      user = await User.findById(creator)

    } catch(err){
        const error = new HttpError('Creating place failed, plaese try aggain.', 500);
        return next(error)
    }

    if(!user){
      const error = new HttpError('Couldnot find user proviedd id', 404);
      return next(error)
    }

    console.log(user)


    try{

      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdPlace.save({ session: sess});
      user.places.push(createdPlace);
      await user.save({ session: sess});
      await sess.commitTransaction();
    


    } catch(err){
      const error = new HttpError('error occured in created place', 500);
      console.log(err)
      return next(error);
    };
    res.status(201).json({place: createdPlace})
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      throw new HttpError('Unvalid value, please check your input', 422)
    }
    const {title, description}= req.body;
    const placeId = req.params.pid;

    let place;

    try{
      place = await Place.findById(placeId)

    }catch(err) {
      const error = new HttpError('somethng wrong couldnt update', 500);
      return next(error);
    }

    place.title = title;
    place.description = description;

    try{
      await place.save();
    } catch(err){
      const error = new HttpError('smthng wrong couldt update place.', 500);
      return next(Error); 
    };
    

    res.status(200).json({place: place.toObject({ getters: true})});

};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;

    try{
      place = await Place.findById(placeId).populate('creator');
    } catch (err) {
      const error = new HttpError("sometihn wrong, couldnt delete", 500)
      return next(error)
    }
    
   try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({session: sess});
    place.creator.places.pull(place);
    await place.creator.save({session: sess});
    await sess.commitTransaction();


   } catch (err) {
    const error = new HttpError("sometihn wrong, 2nd delete", 500);
    return next(error);
  }

  if(!place){
    const error = HttpError('Could not find place for this ID.', 404);
    return next(error)
  }

    res.status(200).json({message: "OBject deleted."});

};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;