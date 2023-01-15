const express = require("express");
const logger = require("morgan");
const run = require("./run");
const submit = require("./submit");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

var allowedOrigins = [
  "https://singa-script.vercel.app/",
  "https://singa-script.vercel.app/home",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(logger("dev"));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/run", run);
app.use("/submit", submit);

app.listen(port, function () {
  console.log(
    `Starting a server on port ${port} at http://localhost:${port}/ ...`
  );
  console.log(`Press Ctrl + C or equivalent to stop the server/`);
});
