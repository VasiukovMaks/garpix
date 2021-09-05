var httpsRedirect = require("express-https-redirect");

const express = require("express");
const app = express();

app.use("/", httpsRedirect());
app.use(express.static("./dist/garpix"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/garpix/" })
);

app.listen(process.env.PORT || 8080);
