'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

// check countConnect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connection:: ${numConnection}`)
}
// check over load
const checkOverLoad = () => {
    setInterval( () => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnection = numCores * 5;

        //console.log(`Memory usage: ${memoryUsage/1024/1024} mb`)
        //console.log(`Active connection ${numConnection}`)

        if(numConnection > maxConnection) {
            console.log(`Connection overload detected`)
        }
    }, _SECONDS) // Monitor every 5 second
}
module.exports = {
    countConnect,
    checkOverLoad
}