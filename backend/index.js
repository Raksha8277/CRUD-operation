const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))


// GET ALL USERS
app.get('/users', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


// GET SINGLE USER
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id
  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


// CREATE USER
app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


// UPDATE USER
app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id
  UserModel.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


// DELETE USER
app.delete('/users/:id', (req, res) => {
  const id = req.params.id
  UserModel.findByIdAndDelete(id)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
  console.log("Server running on port 3001")
})