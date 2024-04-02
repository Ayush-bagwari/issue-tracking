// const {MongoClient} = require('mongodb');
// const url = 'mongodb+srv://ayush:root@cluster1.o5n69.mongodb.net/issuetrackerdb?retryWrites=true&w=majority';

// async function connectToDB(){
//     const client = new MongoClient(url);
//     try{
//         await client.connect();
//         let database = client.db('issuetrackerdb');
//         console.log('Database connection estabilished');
//         return database.collection('IssueTracker2023');
//     }catch(err){
//         throw err;
//     }
// }
const mongoose = require('mongoose');
const url = process.env.DB_URL;

const connectToDB = async() => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connection estabilished");
    }catch(err){
        console.log(err);
    }
}
module.exports = connectToDB;