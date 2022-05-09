import { URLcontroller } from "./controller/URLcontoller";
import express from "express";
import { MongoConnection } from "./database/MongoConnection";

const api = express();
api.use(express.json());
const database = new MongoConnection();
database.connect();

const urlContoller = new URLcontroller();

api.post("/shorten", urlContoller.shorten);
api.get("/:hash", urlContoller.redirect);

api.listen(5000, () => console.log("express  listen"));
