const React = require('react')
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://RachedSouihi:RachedInformatik1242619@cluster0.odiiv58.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectMongoDB() {
  
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
module.exports = {connectMongoDB, client}