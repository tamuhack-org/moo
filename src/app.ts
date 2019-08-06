import * as bodyParser from "body-parser";
import * as ejs from "ejs";
import * as express from "express";
import * as hbs from "hbs";
import { join } from "path";

import { hubRoute } from "./routes/home";
import { emailRoute } from "./routes/email";
import { howdyHackRoute } from "./routes/hh";
import { workshopRoute } from "./routes/workshop";
import { th2019Route } from "./routes/th-2019";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", join(__dirname, "views"));
app.use("/static", express.static(join(__dirname, "/static")));
app.set('view engine', 'hbs');
app.engine("html", ejs.renderFile);

app.get("/", hubRoute);
app.get("/hh", howdyHackRoute);
app.get("/workshops", workshopRoute);
app.get("/th2019", th2019Route);
app.post("/email", emailRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
