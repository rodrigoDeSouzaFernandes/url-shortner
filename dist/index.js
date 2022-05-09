"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URLcontoller_1 = require("./controller/URLcontoller");
const express_1 = __importDefault(require("express"));
const MongoConnection_1 = require("./database/MongoConnection");
const api = (0, express_1.default)();
api.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection();
database.connect();
const urlContoller = new URLcontoller_1.URLcontroller();
api.post("/shorten", urlContoller.shorten);
api.get("/:hash", urlContoller.redirect);
api.listen(5000, () => console.log("express  listen"));
//# sourceMappingURL=index.js.map