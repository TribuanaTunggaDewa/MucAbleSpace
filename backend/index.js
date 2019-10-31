const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 5000

app.use(bodyParser.json())

const checkinController = require('./controllers/checkin')
const customerController = require('./controllers/customers')
const roomController = require('./controllers/rooms')
const adminController = require('./controllers/admin')

const {authenticated} = require('./middleware')

app.group('/api/v2', (routes)=>{

    //auth route
    routes.post('/login',  adminController.login)
    routes.post('/register', adminController.register)


    routes.get('/checkin', authenticated, checkinController.index)
    routes.post('/checkin', checkinController.addCheckin)
    routes.put('/orders', checkinController.checkout)

    routes.get('/customers', authenticated, customerController.index)
    routes.post('/customer', authenticated, customerController.addCustomer)
    routes.put(`/customer/:id`, authenticated, customerController.editCustomer)


    routes.get('/rooms', authenticated, roomController.index)
    routes.post('/room', authenticated, roomController.addRoom)
    routes.put('/room/:id', roomController.editRoom)



})


app.listen(port, ()=> console.log(`Listening on port ${port}`))
