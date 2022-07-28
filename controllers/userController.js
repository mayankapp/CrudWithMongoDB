const router = require("express").Router();
const Joi = require("joi");
const userModal = require("../models/User");
const ObjectId = require('mongodb').ObjectId;


router.get("/", async (req, res) => {
    try {
        const data = await userModal.findAll();
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post("/user/create", createUserSchema,async (req, res,) => {

    try {
        const userData = await userModal.find({username: req.body.username});
        if(userData) {
            console.log("user already exists")
        }else{
            const data = await userModal.post(req.body)
            return res.status(200).send(data)        
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})


router.get("/singaluser/:id",async(req,res)=>{

    try {
        const _id = new ObjectId(req.params.id)
        const data = await userModal.find(_id)
        console.log(data)
        res.status(200).send(data)
    } catch (err) {
        console.log(err.message)
    }

})

router.patch("/user/update/:id",async(req,res)=>{
    try {
        const _id = new ObjectId(req.params.id);
        const data = await userModal.updatedOne({_id},req.body) 
        res.status(200).send(data)
    } catch (err) {
        console.log(err.message)
    }
})


router.delete("/user/delete/:id",async(req,res)=>{
    try {
        const _id = new ObjectId(req.params.id);
        const data = await userModal.Delete({_id}) 
        console.log(data)
        res.status(200).send(data)
    } catch (err) {
        console.log(err.message)
    }
})






















function createUserSchema(req,res,next){
    const schema = Joi.object({
        username:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required(),
    })
    validateRequest(req, next, schema);
}

// helper functions

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

module.exports = router;