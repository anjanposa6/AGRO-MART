const mongoose = require("mongoose");

exports.connectToDb = async () => {
    try {
        const db_uri = "mongodb+srv://pavan147:pavan123@cluster0.xaedvyt.mongodb.net/";
        if (!db_uri) return console.log('Mongodb uri not found');
        const { connection } = await mongoose.connect(db_uri)
        console.log(`Server connected to ${connection.host}`)
        return connection;
    } catch (error) {
        console.log(`Error ${error}`)
    }
}