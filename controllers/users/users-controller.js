import * as usersDao from './users-dao.js';

//todo look at profile screen stuff?

const UsersController = (app) => {
  const findAllusers = async(req, res) => {
    console.log("findAllUsers called");
    try {
      const users = await usersDao.findAllUsers();
      res.json(users);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const findUserByUsername = async(req, res) => {
    console.log("findUserByUsername called with: ", req.params.username);
    try {
      const user = await usersDao.findUserByUsername(req.params.username);
      console.log(user);
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const deleteUserById = async(req, res) => {
    console.log("deleteUserById called");
    try {
      const status = await usersDao.deleteUser(req.params.id);
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const createUser = async(req, res) => {
    console.log("createUser called");
    const user = req.body;
    try{
      const newUser = await usersDao.createUser(user);
      res.json(newUser);
    } catch (err) {
      res.sendStatus(400);
    }
  };
  const updateUser = async(req, res) => {
    console.log("updateUser called");
    const user = req.body;
    console.log(user);
    const userId = req.session.currentUser._id;
    console.log(userId);
    try{
      const status = await usersDao.updateUser(userId, user);
      req.session.currentUser = {...req.session.currentUser, ...user};
      res.send(status);
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  };
  const login = async(req, res) => {
    console.log("login called");
    const user = await usersDao.findUserByCredentials(req.body);
    //if user exists, login
    console.log(user);
    if(user){
      req.session.currentUser = user; //dot notation is fine too
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  };
  const logout = async(req, res) => {
    console.log("logout called");
    req.session.destroy();
    res.sendStatus(200);
  };

  const getCurrentUser = async(req, res) => {
    console.log("currentUser called");
    const user = req.session.currentUser;
    console.log(user);
    if(user){
      res.json(user);
    } else {
      res.json(null);
    }
  };
  const register = async(req, res) => {
    console.log("register called");
    const user = req.body;
    console.log(user);
    const existingUser = await usersDao.findUserByUsername(user.username);
    if (existingUser) {
      res.sendStatus(409);
      return;
    }
    try{
      const newUser = await usersDao.createUser(user);
      req.session.currentUser = newUser;
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  };

  //create endpoints
  app.get("/api/users", findAllusers);
  app.get("/api/users/username/:username", findUserByUsername);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users", updateUser)
  //other endpoints
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/currentUser", getCurrentUser);
  app.post("/api/users/register", register);


}
export default UsersController;