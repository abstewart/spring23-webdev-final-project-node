import * as parkLikesDao from './parkLikes-dao.js';

const ParkLikesController = (app) => {
  const findAllParkLikes = async (req, res) => {
    console.log("findAllParkLikes called");
    const parkLikes = await parkLikesDao.findAllLikes();
    res.json(parkLikes);
  };
  const likedParks = async (req, res) => {
    console.log("likedParks with username called");
    const parks = await parkLikesDao.parksLikedByUsername(req.params.username);
    res.json(parks);

  };
  const whoLiked = async (req, res) => {
    console.log("whoLiked with park called");
    const usernames = await parkLikesDao.usersWhoLikedPark(req.params.park);
    res.json(usernames);
  };
  const numLikesForPark = async (req, res) => {
    console.log("numLikesForPark called");
    const numLikes = await parkLikesDao.numLikesByPark(req.params.park);
    res.json({numLikes});
  };
  const numParksLikedByUser = async (req, res) => {
    console.log("numParksLikedByUser called");
    const numLikes = await parkLikesDao.numLikesByUsername(req.params.username);
    res.json({numLikes});
  };

  const deleteParkLike = async (req, res) => {
    console.log("deleteParkLike called");
    const status = await parkLikesDao.deleteLike(req.params.id);
    res.send(status);
  };
  const deleteParkLikeByParams = async (req, res) => {
    console.log("deleteParkLikeByParams called");
    const status = await parkLikesDao.deleteLikeByParams(req.params.username, req.params.park);
    res.send(status);

  };

  const createParkLike = async (req, res) => {
    console.log("createParkLike called");
    const like = req.body;
    const newLike = await parkLikesDao.createLike(like);
    res.json(newLike);
  };


  app.get("/api/parkLikes", findAllParkLikes);//default
  app.get("/api/parkLikes/byUser/:username", likedParks);
  app.get("/api/parkLikes/whoLiked/:review", whoLiked);
  app.get("/api/parkLikes/numLikedPark/:review", numLikesForPark);
  app.get("/api/parkLikes/numLikedUsername/:username", numParksLikedByUser);
  app.delete("/api/parkLikes/:id", deleteParkLike);
  app.delete("/api/parkLikes/:username/:review", deleteParkLikeByParams);
  app.post("/api/parkLikes", createParkLike);
}
export default ParkLikesController;