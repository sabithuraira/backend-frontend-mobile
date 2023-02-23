const Todo = require('../models/Todo.js')

//SHOW ALL DATA
exports.todos = async(req, res) => {
    try{
        const response = await Todo.findAll({
            order: [ ['id', 'DESC'] ]
        });
        res.status(200).json(response)
    }
    catch(error){
        console.log(error.message);
    }
}

//SHOW DETAIL ONE DATA
exports.findById = async(req, res) => {
    try{
        const response = await Todo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response)
    }
    catch(error){
        console.log(error.message);
    }
    
}

//SAVE NEW DATA
exports.store = async(req, res) => {
    try{
        const response = await Todo.create({
            title: req.body.title,
            description: req.body.description
        });

        res.status(200).json(response);
    }
    catch(error){
        console.log(error.message);
    }
    
}

//UPDATE DATA
exports.update = async(req, res) => {
    try{
        const response = await Todo.update({
            title: req.body.title,
            description: req.body.description
        }, 
        {
            where: { id: req.params.id }
        });

        res.status(200).json("success, data has been saved");
    }
    catch(error){
        console.log(error.message);
    }
    
}

//DELETE DATA
exports.delete = async(req, res) => {
    try{
        const response = await Todo.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json("success, data has been deleted");
    }
    catch(error){
        console.log(error.message);
    }
}