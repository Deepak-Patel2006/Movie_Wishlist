import express from 'express';
import {
    search,
    icon,
    load,
    listing,
    getall,
    removing
} from "../controllers/controllers.js"
import { check_session } from '../middleware/checking.js';


const route = express.Router();

route.get("/search",search);
route.get("/icon",icon);
route.get("/load",load);
route.get("/getall",check_session,getall);
route.post("/listing",check_session,listing);
route.delete("/:Id",check_session,removing)

export default route;

