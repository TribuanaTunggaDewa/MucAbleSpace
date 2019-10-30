const models = require('../models/')
var sequelize= require('sequelize')

exports.index = (req, res) => {
    models.rooms.findAll({include:{
                              model : models.customers,
                              as:"customers",
                              attributes: {exclude: ['createdAt', 'updatedAt']},
                              through: {
                                model: models.orders,
                                as: "orders",
                                attributes: {exclude: ['createdAt', 'updatedAt']}
                                }
                            }
                        }).then(data => {
        res.send(data)
    })
}

exports.addCheckin= (req, res) => {
    models.orders.create(req.body).
    then(() => {
        models.rooms.findAll({include:{
            model : models.customers,
            as:"customers",
            attributes: {exclude: ['createdAt', 'updatedAt']},
          },
           through: {
              model: models.orders,
              as: "orders",
              attributes: {exclude: ['createdAt', 'updatedAt']}
          },
                                
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }).then(data => {
        res.send(data)
        })
    })
}

exports.checkout= (req, res) => {
    models.orders.update({...req.body, is_done: true, is_booked:false},
            {where: {room_id : req.body.room_id,
                     customer_id : req.body.customer_id}}).
            then(()=>{
                models.rooms.findAll({include:{
                    model : models.customers,
                    as:"customers",
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                  },
                   through: {
                      model: models.orders,
                      as: "orders",
                      attributes: {exclude: ['createdAt', 'updatedAt']}
                  },
                                        
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }).then(data => {
                res.send(data)
                })
            })
}