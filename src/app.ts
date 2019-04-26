import * as bodyParser from "body-parser";
import * as ejs from "ejs";
import * as express from "express";
import { join } from "path";

import { homeRoute } from "./routes/home";
import { emailRoute } from "./routes/email";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", join(__dirname, "views"));
app.use("/static", express.static(join(__dirname, "/static")));
app.engine("html", ejs.renderFile);

app.get("/", homeRoute);
app.post("/email", emailRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
