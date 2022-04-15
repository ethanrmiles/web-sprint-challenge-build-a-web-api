const Projects = require("./projects-model");

function ensureIdExists(req, res, next) {
  Projects.get(req.params.id).then((project) => {
    if (project) {
      req.existingProject = project;
      next();
    } else {
      res.status(404);
      next();
    }
  });
}

function checkProjectsValue(req, res, next) {
  Projects.get(req.params.id).then((project) => {
    if (project) {
      req.projectsExist = project;
      next();
    } else {
      res.send([]);
      next();
    }
  });
}

module.exports = {
  ensureIdExists,
  checkProjectsValue
};
