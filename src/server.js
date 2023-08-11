const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
//const data = require("./data");
app.use(express.json());
const PORT = 5000;
const uri =
  "mongodb+srv://RachedSouihi:RachedInformatik1242619@cluster0.odiiv58.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  // await client.db("project").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run()
/*let event_title
const getEventTitle = async() => {
   event_title = await client
    .db("project")
    .collection("event")
    .find({}, {title : 1})
    .toArray();
    module.exports.event_title = event_title
    client.close()
    
};
getEventTitle()*/
app.get('/api/data', async(req, res) => {
    const data = await client.db('project').collection('event').find().toArray()
    res.json(data)
})


app.listen(PORT, () => {
    console.log('Server running on port 5000....')
})

