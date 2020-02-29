const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

const { compile } = require("./compile");

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const port = 3000;

// const tss = require("typescript-simple");
const ts = require("typescript");

const tsOpts = {
  noEmitOnError: true,
  noEmit: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  maxNodeModuleJsDepth: 0,
  checkJs: false
};

const compileMe = val => {
  try {
    // typescript needs this shit in a file
    const where = path.resolve("./temp/poo.ts");
    fs.writeFileSync(where, val);
    console.log(where);
    return compile([where], tsOpts);
  } catch (e) {
    return { _type: "Left", payload: e.message };
  }
};

app.post("/typecheck", (req, res) => {
  const body = req.body;
  const done = compileMe(body.code);
  if (done._type === "Right") {
    res.send("Good!");
  } else {
    res.status(400).send(done.payload);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
