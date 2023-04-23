import * as parkLikesDao from './parkLikes-dao.js';

const ParkLikesController = (app) => {
  const findAllParkLikes = async (req, res) => {
    console.log("findAllParkLikes called");
    try{
      const parkLikes = await parkLikesDao.findAllLikes();
      res.json(parkLikes);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }

  };
  const likedParks = async (req, res) => {
    console.log("likedParks with username called");
    const {username} = req.session.currentUser;
    try{
      const parks = await parkLikesDao.parksLikedByUsername(username);
      res.json(parks);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const whoLiked = async (req, res) => {
    console.log("whoLiked with park called");
    try{
      const usernames = await parkLikesDao.usersWhoLikedPark(req.params.park);
      res.json(usernames);
    } catch (err){
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const numLikesForPark = async (req, res) => {
    console.log("numLikesForPark called");
    try {
      const numLikes = await parkLikesDao.numLikesByPark(req.params.park);
      res.json({numLikes});
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const numParksLikedByUser = async (req, res) => {
    console.log("numParksLikedByUser called");
    const {username} = req.session.currentUser;
    try{
      const numLikes = await parkLikesDao.numLikesByUsername(username);
      res.json({numLikes});
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };

  const deleteParkLike = async (req, res) => {
    console.log("deleteParkLike called");
    try{
      const status = await parkLikesDao.deleteLike(req.params.id);
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }

  };
  const deleteParkLikeByParams = async (req, res) => {
    console.log("deleteParkLikeByParams called");
    const {username} = req.session.currentUser;
    try{
      const status = await parkLikesDao.deleteLikeByParams(username, req.params.park);
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };

  const createParkLike = async (req, res) => {
    console.log("createParkLike called");
    const {username} = req.session.currentUser;
    const pl = {username, park: req.params.parkId, park_name: req.params.park_name}
    try{
      const newLike = await parkLikesDao.createLike(pl);
      res.json(newLike);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };


  app.get("/api/parkLikes", findAllParkLikes);//default
  app.get("/api/parkLikes/byUser", likedParks);
  app.get("/api/parkLikes/whoLiked/:park", whoLiked);
  app.get("/api/parkLikes/numLikedPark/:park", numLikesForPark);
  app.get("/api/parkLikes/numUserLiked", numParksLikedByUser);
  app.delete("/api/parkLikes/:id", deleteParkLike);
  app.delete("/api/parkLikes/parkId/:park", deleteParkLikeByParams);
  app.post("/api/parkLikes/:parkId/:park_name", createParkLike);
}
export default ParkLikesController;