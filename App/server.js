const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/Users");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const Post = require("./models/Blog");
const morgan = require("morgan");

const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const salt = bcrypt.genSaltSync(10);

mongoose.connect(
  process.env.MONGO_DB_ACCESS_KEY 
);

//Register User
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
  console.log(username, password);
});

//Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //console.log(username,password)
  const userDoc = await UserModel.findOne({ username });
  const PassOk = bcrypt.compareSync(password, userDoc.password);
  //console.log(password,userDoc.password)
  if (PassOk) {
    const accessToken = jwt.sign(
      { username, id: userDoc._id },
      process.env.ACCESS_TOKEN_SECRET
      // { expiresIn: "7h" }
      // (err, token) => {
      //   if (err) throw err;
      //   res.cookie('token', token).json('ok');
      // }
    );
    //res.cookie("token", accessToken).json("ok");
    res.send({ accessToken });
    console.log(accessToken);
  } else {
    return res.status(400).json({});
  }

  // return res.status(200).json({
  //   data: {
  //     accessToken,
  //   },
  // });
});

app.post("/profile", (req, res) => {
  const { accessToken } = req.body;
  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (err, info) => {
        if (err) throw err;
        console.log(info);
        res.json(info);
      }
    );
  } catch (e) {
    res.json({});
    console.log(e);
  }
  // console.log(accessToken)
  // res.json(accessToken);
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content, author } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    author,
    cover: newPath,
  });
  res.json({ postDoc });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  res.json(posts);
});

// Inside the "/post/:id" route handler
app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    
    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.json(postDoc);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
    console.log(e);
  }
});


const port = 3000; // choose a port number
app.listen(port)
