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

// function validateInput(req, res, next) {
//   if (typeof req.body.name != "string" || req.body.name.trim() == "") {
//     res.status(400).json({ message: "name is required and must have a value" });
//     return;
//   } else {
//     if (
//       typeof req.body.description != "string" ||
//       req.body.description.trim() == ""
//     ) {
//       res
//         .status(400)
//         .json({ message: "description is required and must have a value" });
//       return;
//     }
//     Projects.insert(req.body)
//     .then(newProj => {
//         req.validatedPost = newProj
//     })
//   next();
//   }
 

// }

module.exports = {
  ensureIdExists,
  checkProjectsValue,
//   validateInput,
};
