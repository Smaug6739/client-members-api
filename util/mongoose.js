const mongoose = require("mongoose");
module.exports =  {

  init: () => {
    const mongooseDB = "mongodb://localhost:27017/espacemembresfrontend"
    const mongOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds //5000
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  //45000
      family: 4 // Use IPv4, skip trying IPv6
    }

    mongoose.connect(mongooseDB, mongOptions);//createConnection //connect
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () =>{ 
      console.log("Mongoose est connecté!")
      
    });
  }
}