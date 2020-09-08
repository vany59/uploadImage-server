const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const app = express();
app.listen(3000);

app.use(cors());
app.use(upload());

app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/test", (req, res) => {
  res.send("ok");
});

app.post("/", (req, res) => {
  // console.log(req);
  if (req.files) {
    // console.log(req.files);
    const file = req.files.file;
    const filename = file.name;
    console.log(filename);

    file.mv(path.resolve(`./uploads/${filename}`), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`http://localhost:3000/${filename}`);
      }
    });
  }
});
