const { conectar } = require("./express");


async function main() {
    try {
        const serv = await conectar(8080);
        console.log(`conectado al puerto ${serv.address().port}`)
    } catch(error) {
        console.log("fallo: " + error)
    }
}

main();