import * as usersDao from './users-dao.js';

let currentUser = null;
const UsersController = (app) => {
  const findAllusers = async(req, res) => {};
  const findUserById = async(req, res) => {};
  const deleteUserById = async(req, res) => {};
  const createUser = async(req, res) => {};
  const updateUser = async(req, res) => {};
  const login = async(req, res) => {};
  const logout = async(req, res) => {};

//const profile = async(req, res) => {};
  const register = async(req, res) => {};

  //create endpoints
  app.get("/api/users", findAllusers);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser)
  //other endpoints
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  //app.get("/api/users/profile", profile);
  app.post("/api/users/register", register);


}
export default UsersController;