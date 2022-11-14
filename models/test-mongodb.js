const {MongoClient} = require('mongodb')

const url = "mongodb+srv://miaomiaoxr:miaomiaoxr@cluster0.zwe6x.mongodb.net/phonebook?retryWrites=true&w=majority"

const client = new MongoClient(url)

//connect to monogodb
client.connect().then(() => {
    console.log('Connected to MongoDB')
    const collection = client.db('phonebook').collection('notes')
    console.log('Collection:', collection)
}
).catch(error => {
    console.log('Failed to connect to MongoDB:', error.message)
}
).finally(() => {
    client.close()
})