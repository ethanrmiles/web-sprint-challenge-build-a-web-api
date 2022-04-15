const Actions = require('./actions-model')

function ensureIdExists(req, res, next) {
    Actions.get(req.params.id).then((action) => {
      if (action) {
        req.existingAction = action;
        next();
      } else {
        res.status(404);
        next();
      }
    });
  }

  module.exports = {
      ensureIdExists
  }
 