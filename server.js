const app = require("./src/app");
const PORT = 5001
const server = app.listen(PORT, () => {
    console.log(`eCommerce start in ${PORT}`)
})

process.on('SIGINT', () => {
    server.close( () => {
        console.log('Exit Server Express')
    })
})