const express = require("express");
const { controller, 
    controllerWelcome, 
    controllerBye } = require("../controllers/webControllers");

//get => web server
const webRouter = express.Router();

webRouter.get("/", controller);
webRouter.get("/bienvenida", controllerWelcome);
webRouter.get("/despedida", controllerBye);

exports.webRouter = webRouter;
