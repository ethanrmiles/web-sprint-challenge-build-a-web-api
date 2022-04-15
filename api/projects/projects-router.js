const express = require('express')
const Projects = require('./projects-model')
const router = express.Router();

const { checkProjectsValue, ensureIdExists } = require('./projects-middleware')

router.get('/', checkProjectsValue, (req,res,next ) => {
    res.send(req.projectsExist)
})

router.get('/:id', ensureIdExists, (req,res, next) => {
    // const id = req.params.id
    // Projects.get(id)
    // .then(project => {
    //     res.json(project)
    // })
    res.json(req.existingProject)
})

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.json(project.actions)
    })
})

router.post('/', (req,res ) => {
    Projects.insert(req.body)
    .then(newAction => {
        res.json(newAction)
    })
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