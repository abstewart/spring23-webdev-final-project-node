import * as usersDao from './users-dao.js';

//let currentUser = null;
//todo look at profile screen stuff?

const UsersController = (app) => {
  const findAllusers = async(req, res) => {
    console.log("findAllUsers called");
    const users = await usersDao.findAllUsers();
    res.json(users);
  };
  const findUserById = async(req, res) => {
    console.log("findUserById called");
    const user = usersDao.findUserById(req.params.id);
    res.json(user);
  };
  const deleteUserById = async(req, res) => {
    console.log("deleteUserById called");
    const status = await usersDao.deleteUser(req.params.id);
    res.send(status);
  };
  const createUser = async(req, res) => {
    console.log("createUser called");
    const user = req.body;
    const newUser = await usersDao.createUser(user);
    res.json(newUser);
  };
  const updateUser = async(req, res) => {
    console.log("updateUser called");
    const user = req.body;
    const status = await usersDao.updateUser(req.params.id, user);
    res.send(status);
  };
  const login = async(req, res) => {
    console.log("login called");
    const user = await usersDao.findUserByCredentials(req.body);
    //if user exists, login
    //await new Promise(resolve => setTimeout(resolve, 5000))
    console.log(user);
    if(user){
      req.session["currentUser"] = user; //dot notation is fine too
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

  //could provide the user and the liked reviews?
  //and the reviews?
  const getCurrentUser = async(req, res) => {
    console.log("currentUser called");
    const user = req.session.currentUser;
    console.log("req.session.currentUser")
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
    const existingUser = await usersDao.findUserByUsername(user.username);
    if (existingUser) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao.createUser(user);
    req.session.currentUser = newUser;
    res.json(newUser);
  };

  //create endpoints
  app.get("/api/users", findAllusers);
  app.get("/api/users/id/:id", findUserById);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser)
  //other endpoints
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/currentUser", getCurrentUser);
  app.post("/api/users/register", register);


}
export default UsersController;