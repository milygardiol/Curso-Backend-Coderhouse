const express = require("express")
const {webRouter} = require("./routes/webRouter.js")
const {apiRouter} = require("./routes/products.js")
const app = express()

//routes
app.use('/', webRouter)
app.use('/api/productos', apiRouter)

//middleware => software entre medio de dos procesos
app.use(express.json());

//=> interpreta y lleva el json para el body
app.use(express.urlencoded({ extended: true }));




//listen

function server (puerto) {
    return new Promise((res, rej) => {
        const serverConected = app.listen(puerto, () => {
            res(serverConected)
        })
        serverConected.on("error", error => rej(error))
    })
}
async function main() {
    try {
        const serv = await server(8080);
        console.log(`conectado al puerto ${serv.address().port}`)
    } catch(error) {
        console.log("fallo: " + error)
    }
}

main();

exports.app = app