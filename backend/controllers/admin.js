const jwt = require('jsonwebtoken')

const models = require('../models')
const admin = models.admins

exports.login = (req, res) => {
    console.log(req.body)
    admin.findOne({
        attributes:['username'],
        where:{
            username: req.body.username,
            password: req.body.password
        }
    }).
    then(user=>{
        if(user){
            const token = jwt.sign({userid: admin.id}, 'our-secret-key')
            res.send({
                user,   
                token
            })
        }else{
            res.send({
                error: true,
                message: 'wrong email or password'
            })
        }
    }).catch({
        message: 'username and password undefined'
    })

}

exports.register = (req, res) => {
    console.log(req.body)
    admin.create(req.body).
    then(user=>{
        if(user){
            const token = jwt.sign({userid: admin.id}, 'our-secret-key')
            res.send({
                'username' : user.username,
                'Token': token
            })
        }else{
            res.send({
                error: true,
                message: 'wrong email or password'
            })
        }
    }).catch({
        message: 'username and password undefined'
    })

}