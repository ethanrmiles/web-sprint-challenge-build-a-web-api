const express = require('express')
const Actions = require('./actions-model')
const router = express.Router();

const { ensureIdExists } = require('./actions-middlware')



router.get('/', (req,res ) => {
    Actions.get(null)
    .then(action => {
        res.json(action)
    })
})

router.get('/:id', ensureIdExists, (req,res, next) => {
    // const id = req.params.id
    // Actions.get(id)
    // .then(action => {
    //     res.json(action)
    // })
    res.json(req.existingAction)
})

router.post('/', (req,res ) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
})

router.put('/:id', (req,res ) => {
    const changes = req.body
    Actions.update(req.params.id, changes)
    .then(action => {
        if (action){
            res.json(action)
        }else {
            res.json({ message: "something went wrong"})
        }
    })
})  

router.delete('/:id', (req,res ) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.json({ message: 'It has been deleted'})
    })
})

module.exports = router