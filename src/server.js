const {connectMongoDB, client} = require('./connectionDB')
const fs = require('fs')
connectMongoDB()
async function fetchDataFromMongoDB(){
    const collection = client.db('project').collection('user')
    try{
        const data = await collection.find({}).toArray()
        fs.writeFileSync('data.json', JSON.stringify(data))
        client.close()

    }catch(e){
        console.log('Error found')
    }
}
fetchDataFromMongoDB()

