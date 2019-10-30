const models = require('../models')
const rooms = models.rooms


exports.index = (req, res) => {
    rooms.findAll({attributes:['id','name']}).
    then(rooms => res.send(rooms)).catch({
        message: 'request rejected'
    })
}

exports.addRoom = (req,res) => {
        rooms.create(req.body).then(rooms => {
           res.send({
               'id': rooms.id,
               'name': rooms.name
           })      
    })
}

exports.editRoom = (req, res) => {
    rooms.update(
        req.body, 
        {where:{ id: req.params.id}}
    ).then(() => {
        rooms.findAll({attributes:['id','name']}).
        then(rooms => res.send(rooms)).catch({
            message: 'request rejected'
        })
    })
}