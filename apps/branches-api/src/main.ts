import * as express from "express";
import * as branches from "./routes/branches";

let app = express();

app.use(`/`, branches.router);

app.listen(8080, () => {
    console.log(`listening on port 8080`);
});