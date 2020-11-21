const express = require('express');
const Route_Details = require('../models/route');
const router = express.Router();

router.post('', (req, res, next)=>{
    const route = new Route_Details({
        route_name: req.body.route_name
    })
    route.save().then(result=>{
        res.status(201).json({
            message:"Post added successfully",
            res:result
        })
    }).catch(err=>{res.status(500).json({
        message:"Error occured",
        res:err
    })})
})

router.get('',(req, res, next)=>{
    Route_Details.find().then(documents => {
        res.status(200).json({
            documents:documents
        })
    })
})

router.delete('/:id',(req, res, next)=>{
    Route_Details.deleteOne({_id: req.params.id}).then(result=>{
     
            console.log(result);
            res.status(200).json({ message: 'Post deleted' });
    })
})

router.put('/:id',(req, res, next)=>{
    console.log(req.body)
    const route = new Route_Details({
        _id: req.body._id,
        route_name: req.body.route_name
    })
    Route_Details.updateOne({_id: req.params.id}, route).then(result=>{
        res.status(200).json({message:'Post Update Successfully', res:result})
    }).catch(err=>{
        res.status(500).json({message:"Post update failed", res:err})
    })
})

module.exports = router;