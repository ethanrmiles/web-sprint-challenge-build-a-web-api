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
    res.send(':/id being hit')
})  

router.delete('/:id', (req,res ) => {
    res.send(' delete :/id being hit')
})

module.exports = router