const HelloController = (app) => {

  app.get('/hello', (req, res) => {
    res.send('Life is good!')
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the spring23-webdev-final-project-node server!')
  });
};
export default HelloController;
