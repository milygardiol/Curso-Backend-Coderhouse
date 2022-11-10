// Express como libreria 
const express = require ("express")
const fs = require('fs')



class Contenedor {
    constructor(file) {
        this.file = file;
    }
    async getAll() {
        const response = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(response)
    }
}

const producto1 = new Contenedor("./productos.txt");

// send => le asigna cabeceras (headers)
//end => carga el contenido (cuerpo)
// endpoints => puntos de acceso
server.get("/productos", (request, response) => {
    producto1.getAll().then((response) => response.send(response))
})

server.get("/productosrandom", (request, response) => {
    const randomNumber = Math.floor(Math.random() * 3);
    producto1.getAll().then((response) => response.send(response[randomNumber]))
})


//funcion conectar con el puerto
//si no hay puerto, es al azar
function conectar (puerto) {
    return new Promise((resolve, reject) => {
        const serverConected = server.listen(puerto, () => {
            resolve(serverConected)
        })
        serverConected.on("error", error => reject(error))
    })
}

//export
module.exports = {conectar}