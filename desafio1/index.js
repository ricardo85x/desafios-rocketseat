const express = require('express');

const app = express()

let projects = []

let nrequests = 0

app.use(express.json())

app.use((req,res,next) => {
    nrequests++
    console.log(`current request ${nrequests}`)
    next()
})

function projectExistsParam(req, res, next) {

    const { id } = req.params
    if (!id) {
        return res.status(401).json({ error: 'field id is required'})
    }

    let indexProject = projects.findIndex(item => item.id == id)


    if (indexProject == -1) {
        return res.status(400).json({error: 'project not found'})
    }

    req.indexProject = indexProject

    next()
}

app.post('/projects', (req,res) => {

    const { id, title } = req.body
    if ( id && title) {
        if (!projects.find(item => item.id == id)){
            projects.push({
                id,
                title,
                tasks: []
            })
            return res.json(projects)
        } else {
            return res.json({ error: 'this id has already been taken'})
        }
    }
    return res.json({ error: 'id and title is required'})
})


app.get('/projects', (req, res) => {
    res.json(projects)
})

app.delete('/projects/:id', projectExistsParam, (req, res) => {

    projects.splice(req.indexProject, 1)
    return res.json({ status: 'ok'})
} )

app.put('/projects/:id', projectExistsParam, (req, res) => {

    const { title } = req.body

    if (!title) {
        return res.status(401).json({ error: 'title is required'})
    }

    projects[req.indexProject].title = title

    return res.json(projects[req.indexProject])
})

app.post('/projects/:id/tasks', projectExistsParam, (req, res) => {

    const { title } = req.body

    if (!title) {
        return res.status(401).json({ error: 'title is required'})
    }

    projects[req.indexProject].tasks.push(title)
    return res.json(projects[req.indexProject])
})


const port = 3211
app.listen(port, () => console.log(`servidor rodando em http://localhost:${port}`))

