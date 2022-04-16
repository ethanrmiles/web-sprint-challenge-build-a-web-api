const express = require('express')
const Projects = require('./projects-model')
const router = express.Router();

const { checkProjectsValue, ensureIdExists } = require('./projects-middleware')

router.get('/', checkProjectsValue, (req,res,next ) => {
    res.send(req.projectsExist)
})

router.get('/:id', ensureIdExists, (req,res, next) => {
    res.json(req.existingProject)
})

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.json(project.actions)
    })
})

router.post('/',   (req,res ) => {
    const { name, description } = req.body
        if(!name || typeof name != 'string'){
            res.status(400).json({ message: 'please input a name'})
            return
        }else if(!description || typeof description != 'string'){
            res.status(400).json({ message: 'please input a description'})
            return
        }else{
            Projects.insert(req.body)
            .then(newAction => {
                    res.status(201).json(newAction)
                })
        }
})

router.put('/:id', ensureIdExists, (req,res, next ) => {
    const changes = req.body
    const { name, description, completed  } = req.body
    if(!req.body.hasOwnProperty('name')){
        res.status(400).json({ message: 'please input a name'})
        return
    }else if (!req.body.hasOwnProperty('description')){
        res.status(400).json({ message: 'please input a description'})
    }else if (!req.body.hasOwnProperty('completed')){
        res.status(400).json({ message: 'please input a completion status'})
    }else{
        Projects.update(req.params.id, changes)
        .then(action => {
            if(action){
                res.json(action)
            }else {
                res.status(404).json({ message: 'there is no project with that id'})
            }
        })
    }
})

router.delete('/:id', (req,res ) => {
    Projects.remove(req.params.id)
    .then(action => {
        if(!action){
            res.status(404).json({ message: "there is no project with that id"})
        }else{
            res.json(action)
        }
    })
})

module.exports = router