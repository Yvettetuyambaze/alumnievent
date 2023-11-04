// ABOUT CODES
// the purpose of the code, which involves creating an environment configuration file 
// from a provided template and handling any errors that might occur during the process.

const fs = require('fs-extra')

try {
    fs.copySync('./config/config.env.example', './config/config.env')
    console.log('Environment file created successfully.')
} catch (err) {
    console.error(err)
}
// Import the fs-extra module for file system operations
const fs = require('fs-extra')

// Attempt to copy the configuration file template to the actual configuration file
try {
    // Copy the contents of the example environment file to the actual environment file
    fs.copySync('./config/config.env.example', './config/config.env')

    // Log a success message if the operation was successful
    console.log('Environment file created successfully.')
} catch (err) {
    // Log any errors that occur during the file copy operation
    console.error(err)
}
