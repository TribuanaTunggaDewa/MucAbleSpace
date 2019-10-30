const models = require('../models')
const costumers = models.customers

exports.index = (req, res) => {
    costumers.findAll({attributes:['id','name','identity_number','phone_number','image']}).
    then(customers=>res.send(customers)).catch({
        message: 'request rejected'
    })
}

exports.addCustomer = (req, res) => {
    costumers.create(req.body, req.body.image='https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg').then(customer => {
        res.send({
            'name' : customer.name,
            'identity_number' : customer.identity_number,
            'phone_number': customer.phone_number,
            'image': customer.image
        })
    })
}

exports.editCustomer = (req, res) => {
    costumers.update({...req.body, image:'https://s.kaskus.id/images/2012/12/12/2080167_20121212055324.jpg'},
    {where:{id:req.params.id}}
    ).then(()=>{
        costumers.findAll({attributes:['id','name','identity_number','phone_number','image']}).
        then(customers=>res.send(customers)).catch({
            message: 'request rejected'
        })
    })
}