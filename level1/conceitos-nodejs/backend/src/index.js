// import express from 'express'
const express = require('express')


app = express()
app.use(express.json())

// Midleware - interceptor
function logRequest(request, response, next) {
    const { method, url } = request
    const logItem = `[${method.toUpperCase()}] ${url}`

    console.log(logItem)

    return next()
}

// app.use(logRequest)
// app.use('/project/:id', logRequest)

app.get('/projects', logRequest, (request, response) => {
    const query = request.query
    const param = request.params

    console.log(query)

    response.json([
        'projet 1', 'projeto 2'
    ])
})

app.post('/projects/:id', (request, response) => {

    const body = request.body

    console.log(query)

    response.json([
        'projet 1', 'projeto 2'
    ])
})

app.listen(3333, () => {
    console.log('🚀 Backend started!')
})