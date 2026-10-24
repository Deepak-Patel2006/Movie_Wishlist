import {connect} from "./src/configureDB/config.js";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

const port = process.env.PORT || 4050;
await connect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

