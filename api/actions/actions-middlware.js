const Actions = require('./actions-model')
const Projects = require("../projects/projects-model")

function ensureIdExists(req, res, next) {
    Actions.get(req.params.id).then((action) => {
      if (action) {
        req.existingAction = action;
        next();
      } else {
        res.status(404).json({ message: 'there is no action with this id '});
        next();
      }
    });
  }

function getAmountOfProjects (req, res, next){
    Projects.get(null)
    .then(array => {
        req.numOfProjects = array.length
        console.log('req inside array', req.numOfProjects)
    })
    next()
}

  module.exports = {
      ensureIdExists, 
      getAmountOfProjects
  }
 