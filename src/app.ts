import * as express from "express";
import { homeRoute } from "./routes/home";
import { registerEmail } from "./routes/email";
import * as bodyParser from "body-parser";
import { join } from "path";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", join(__dirname, "../../views"));
app.set("view engine", "pug");

app.get("/", homeRoute);
app.post("/registerEmail", registerEmail);

export { app };
