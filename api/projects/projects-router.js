const express = require('express')
const Projects = require('./projects-model')
const router = express.Router();

router.get('/', (req,res ) => {
    Projects.get(null)
    .then(action => {
        res.json(action)
    })
})

router.get('/:id', (req,res ) => {
    const id = req.params.id
    Projects.get(id)
    .then(action => {
        res.json(action)
    })
})

// router.get('/:id/actions', (req,res ) => {
//     Projects.get(req.params.id)
//     .then(action => {
//         res.json(action)
// })

router.post('/', (req,res ) => {
    // Projects.insert(req.body)
    // .then(newAction => {
    //     res.json(newAction)
    // })
    res.send(' post/ route hit')
})

router.put('/:id', (req,res ) => {
    const changes = req.body
    Projects.update(req.params.id, changes)
    .then(action => {
        if (action){
            res.json(action)
        }else {
            res.json({ message: "something went wrong"})
        }
    })
})  

router.delete('/:id', (req,res ) => {
    Projects.remove(req.params.id)
    .then(action => {
        res.json({ message: 'It has been deleted'})
    })
})

module.exports = router