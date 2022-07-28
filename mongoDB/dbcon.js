const { MongoClient } = require("mongodb");
require("dotenv").config();
let _db
let client

module.exports = {
    async connectToServer(){
        client = await MongoClient.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/NodeCrudWithMongoDB");
        _db = client.db(process.env.dbname || "NodeCrudWithMongoDB");
    },
    async closeConnection(){
        client.close()
    },
    get(){
        return _db
    }
}
