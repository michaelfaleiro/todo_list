require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");

const port = process.env.PORT;

connectToDb();
app.use(express.urlencoded());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(port, () => {
  console.log(`Rodando na Porta ${port}`);
});
