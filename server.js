const express = require('express');

//router imports
projectRouter = require('./data/helpers/project-router');
actionRouter = require('./data/helpers/action-router');

//server
const server = express();

//express
server.use(express.json());

//routers
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

//middleware


//main 
server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge</h2>`);
});


//global error
server.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Global Error!',
    err
  });
});

module.exports =server;
