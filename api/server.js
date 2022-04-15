const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('../api/actions/actions-router') 

const server = express()

server.use(express.json())
server.use(helmet())

// server.use('/', (req,res) => res.send('API is up and running!'))

server.use('/api/actions', actionsRouter )



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
