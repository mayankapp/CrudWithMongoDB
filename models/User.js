const db = require("../mongoDB/dbcon");
const tableName = "User"

const findAll = async()=>{
    return db.get().collection(tableName).find().toArray()
}

const post = async(data)=>{    
    return db.get().collection(tableName).insertOne(data)
}

const find = async(cond)=>{
    return db.get().collection(tableName).findOne(cond)
}

const updatedOne = async(query,data)=>{
    return db.get().collection(tableName).updateOne(query,{$set:data})
}

const Delete = async(data)=>{
    return db.get().collection(tableName).deleteOne(data)
}



module.exports ={
    findAll,
    post,
    find,
    updatedOne,
    Delete
}

