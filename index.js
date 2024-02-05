const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectToMongodb } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const port = 8001;

const app = express();

//tell express what engine to use
app.set("view engine", "ejs");
//tell express where is your ejs file located
app.set("views", path.resolve("./views"));

connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(
  console.log("mongo db connected")
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectedUrl);
});

app.listen(port, () => console.log(`Server started at Potrt Number ${port}`));
