require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT } = require("../common/environments");
var cors = require('cors')

var path = require("path");
// require('../database/db-sync')()
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())


require("../common/helpers/model-association")();

const wallets = require("./wallets/controller");
const auctions = require("./auctions/controller");
const offers = require("./offers/controller");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/wallets", wallets);
app.use("/auctions", auctions);
app.use("/offers", offers);

// app.use(error)
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${PORT}`);
});
