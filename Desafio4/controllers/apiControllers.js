const fs = require ("fs")
const { randomUUID } = require('crypto');

//thing
class Contenedor {
  constructor(file) {
      this.file = file;
  }
  async getAll() {
      const response = await fs.promises.readFile(this.file, 'utf-8')
      return JSON.parse(response)
  }
}

const productos = new Contenedor("./productos.txt");



//endpoints => GET
async function controllerGet (req, res) {
    await getAll(productos)
    .then(resultado => {
        res.json(resultado)
    })
    .catch(err => {
        res.status(500);
        res.json({mensaje: err})
    })
}

// GET ID
async function controllerGetId ({ params: { id } }, res) {
    await getAll(productos)
    .then(resultado => {
        const buscado = resultado.find(c => c.id === id);
        if (!buscado) {
            res.status(404);
            res.json({mensaje: `No se encontró el producto con el id: ${id}`});
        } else {
            res.json(buscado);
        }
    })
    .catch(err => {
        res.status(500);
        res.json({mensaje: err})
    })
}

// POST
async function controllerPost({body}, res) {
    try {
        const objeto = body;
        objeto.id = randomUUID();
        productos.push(objeto);
        res.status(201);
        res.json(objeto);
    } catch (error) {
        throw new Error('Se ha producido un error al agregar un nuevo objeto');
  }
}


//PUT 
async function controllerPut ({ body, params: { id } }, res) {
    try {
        const array = await getAll(productos);
        const pos = array.findIndex(obj => obj.id === id);
        if (pos >= 0) {
          const obj = { ...array[pos], ...body };
          await controllerPut(pos, obj);
          res.json(obj);
        } else {
          res.status(404);
          res.json({ 'mensaje': 'objeto no encontrado' });
        }
    } catch (error) {
        throw new Error('Se ha producido un error al querer actualizar un objeto');
    }
}

//DELETE
async function controllerDelete ( { params: {id} }, res) {
    await getAll(productos)
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró cosa con ese id (${id})` });
    } else {
        const borrados = cosas.splice(indiceBuscado, 1);
        res.sendStatus(204)
        res.json(borrados[0]);
    }
}

exports.controllerGet = controllerGet;
exports.controllerGetId = controllerGetId;
exports.controllerPost = controllerPost;
exports.controllerPut = controllerPut;
exports.controllerDelete = controllerDelete;