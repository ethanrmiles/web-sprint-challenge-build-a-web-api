const express = require('express')
const Actions = require('./actions-model')
const router = express.Router();

router.get('/', (req,res ) => {
    Actions.get(null)
    .then(action => {
        res.json(action)
    })
})

router.get('/:id', (req,res ) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        res.json(action)
    })
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
    res.send(' delete :/id being hit')
})

module.exports = router