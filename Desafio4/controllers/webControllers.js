const express = require("express");

//endpoints
//web server
function controller(req, res) {
    res.send("todo ok");
}
function controllerWelcome(req, res) {
    res.json({ mensaje: "bienvenido!" });
}
function controllerBye(req, res) {
    res.send("adios!");
}

exports.controllerBye = controllerBye;
exports.controllerWelcome = controllerWelcome;
exports.controller = controller;


