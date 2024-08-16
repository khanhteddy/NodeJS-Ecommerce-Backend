const app = require("./src/app");
const PORT = process.env.PORT || 3056
const server = app.listen(PORT, () => {
    console.log(`eCommerce start in ${PORT}`)
})

process.on('SIGINT', () => {
    server.close( () => {
        console.log('Exit Server Express')
        process.exit(0); // Ensures the process exits after the server is closed
    })
})