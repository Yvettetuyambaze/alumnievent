// ABOUT CODES
// The purpose of the code is to create an environment configuration file 
// from a provided template and handle any errors that might occur during the process.

const fs = require('fs-extra')

try {
    fs.copySync('./config/config.env.example', './config/config.env')
    console.log('Environment file created successfully.')
} catch (err) {
    console.error(err)
}