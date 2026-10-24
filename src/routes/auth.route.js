import express from "express";

import{
    signup,
    login,
    status,
    logout
} from "../controllers/auth_controller.js"

const routes = express.Router();


routes.get('/status',status)
routes.post("/register",signup);
routes.post('/logout',logout);
routes.post("/login",login);

export default routes;
