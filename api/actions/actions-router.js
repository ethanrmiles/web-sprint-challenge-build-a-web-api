const express = require('express')
const Actions = require('./actions-model')
const router = express.Router();

const { ensureIdExists, getAmountOfProjects } = require('./actions-middlware')



router.get('/', (req,res ) => {
    Actions.get(null)
    .then(action => {
        res.json(action)
    })
})

router.get('/:id', ensureIdExists, (req,res, next) => {
    res.json(req.existingAction)
})

router.post('/',  (req,res, next ) => {
    const { project_id, description, notes } = req.body
    if(!notes || typeof notes != 'string'){
        res.status(400).json({ message: 'please input some notes'})
        return
    }else if(!description || typeof description != 'string'){
        res.status(400).json({ message: 'please input a description'})
        return
    }else{
    Actions.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
}
})

router.put('/:id',  ensureIdExists,  (req,res, next ) => {
    const  changes  = req.body
    if(!req.body.notes || typeof req.body.notes != 'string'){
        res.status(400).json({ message: 'please input some notes'})
        return
    }else if(!req.body.description || typeof req.body.description != 'string'){
        res.status(400).json({ message: 'please input a description'})
        return
    }else if(!req.body.project_id || typeof req.body.project_id != 'number'){
        res.status(400).json({ message: 'please input a project_id'})
        return
    }else{
    Actions.update( req.existingAction.id, changes)
    .then(action => {
            res.json(action)
    })
}
})  

router.delete('/:id', (req,res ) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.json({ message: 'It has been deleted'})
    })
})

module.exports = router