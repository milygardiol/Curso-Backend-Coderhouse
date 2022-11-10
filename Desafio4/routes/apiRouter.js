const express = require ("express")
const { Router } = require('express');
const fs = require('fs');
const apiRouter = express.Router();

// FUNCTION GETALL
async function getAll() {
    try {
        const response = await fs.promises.readFile('./productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) { return 'Error! No se encontró el archivo' }
}


// ENDPOINT GET
apiRouter.get('/', (req, res) => getAll().then(data => res.json(data)))
    
apiRouter.get('/:id', (req, res) => {
        getAll().then((data) => {
            const response = data.find(item => item.id == req.params.id);
            res.json(response == undefined ? { error: 'Error! No se encontró el archivo' } : response)
        })
            .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
    })

// ENDPOINT PUT
apiRouter.put('/:id', (req, res) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: (req.params.id)
    }

    getAll().then((data) => {
        const itemFind = data.find(item => item.id == req.params.id);
        const itemPosition = data.indexOf(itemFind);

        if (itemPosition !== -1) {
            data.splice(itemPosition, 1);
            data.push(product)
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: 'Producto encontrado y modificado' });
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    })
        .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
})

// ENDPOINT DELETE
apiRouter.delete('/:id', (req, res) => {
    getAll().then((data) => {
        const itemFind = data.find(item => item.id == req.params.id);
        const itemPosition = data.indexOf(itemFind);

        if (itemPosition !== -1) {
            data.splice(itemPosition, 1);
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: `Se eliminó el producto de id: ${req.params.id}` });
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    })
        .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
})

// ENDPOINT POST
apiRouter.post('/', (req, res) => {
    const product = {
        title: req.body.title,
        price: Number(req.body.price),
        thumbnail: req.file.path
    }
    getAll()
        .then((data) => {
            data.push({ ...product, id: data.length + 1 });
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: `Producto guardado con id: ${data.length}` });
        })
        .catch((e) => {
            product.id = 1;
            fs.writeFileSync('./productos.txt', `[${JSON.stringify(product)}]`);
            res.json({ msg: 'Producto guardado con id: 1' });
        })
})

// EXPORT
module.exports = apiRouter;