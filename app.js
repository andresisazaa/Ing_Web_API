const Express = require('express');
const server = require('./config/server');

const app = new Express();
server(app);

app.listen(app.get('port'), () => {
  console.log(`The app is listening on the port ${app.get('port')}`);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Students Web API</h1>
    <h3>Visit de route /students<h3>
    `);
});