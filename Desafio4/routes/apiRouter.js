const express = require('express');
const { controllerGet,
    controllerGetId,
    controllerPost,
    controllerPut,
    controllerDelete } = require("../controllers/apiControllers");

const routerApi = express.Router();

routerApi.get('/', controllerGet);
routerApi.get('/:id', controllerGetId);
routerApi.post('/', controllerPost);
routerApi.put('/:id', controllerPut);
routerApi.delete('/:id', controllerDelete);

exports.routerApi = routerApi;