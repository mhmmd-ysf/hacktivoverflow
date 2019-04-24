const route = require('express').Router()
const { ControllerUser } = require('../controllers')
const { ControllerQuestion } = require('../controllers')
const { ControllerAnswer } = require('../controllers')
const authenticate = require('../middlewares/authenticate')

route.get('/', (req, res) => {res.status(200).json({message: 'Home'})})
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)

route.get('/users', ControllerUser.findAll)
route.get('/users/:id', ControllerUser.findOne)
route.put('/users/:id', authenticate, ControllerUser.update)
route.delete('/users/:id', /* authenticate, */ ControllerUser.delete)

route.post('/questions', authenticate, ControllerQuestion.create)
route.get('/questions', ControllerQuestion.findAll)
route.get('/questions/:questionId', ControllerQuestion.findOne)
route.put('/questions/:questionId', authenticate, ControllerQuestion.update)
route.delete('/questions/:questionId', authenticate, ControllerQuestion.delete)
route.put('/questions/vote/:questionId', authenticate, ControllerQuestion.vote)

route.post('/answers', authenticate, ControllerAnswer.create)
route.get('/answers', ControllerAnswer.findAll)
route.get('/answers/:answerId', authenticate, ControllerAnswer.findOne)
route.put('/answers/:answerId', authenticate, ControllerAnswer.update)
route.delete('/answers/:answerId', authenticate, ControllerAnswer.delete)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route