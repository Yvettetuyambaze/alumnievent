//ABOUT THE CODES
//This code snippet establishes a connection to the MongoDB database using the Mongoose library. 
//It includes error handling to gracefully handle connection failures and outputs appropriate logs for debugging purposes.

// Importing the mongoose module


const mongoose = require('mongoose')

// Defining an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Using the mongoose connect method to connect to the provided MongoDB URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Setting the option to parse the MongoDB connection string
      useUnifiedTopology: true, // Setting the option for using the new MongoDB connection management engine
      useFindAndModify: false, // Setting the option to use the MongoDB driver's findOneAndUpdate() function instead of findAndModify()
    })

    // Logging a success message along with the host of the connected MongoDB database
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`)
  } catch (err) {
    // Logging the error if the connection to the database fails
    console.error(err)
    // Exiting the process with a non-zero exit code
    process.exit(1)
  }
}

// Exporting the connectDB function to make it accessible from other modules
module.exports = connectDB
