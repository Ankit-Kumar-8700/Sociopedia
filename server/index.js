import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import { verifyToken } from "./middleware/auth.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "assets")));





/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets");
    },
    filename: function (req, file, cb) {
      const preName=Math.floor(Math.random() * 1000000000);
      req.body.picPath=`${preName}${file.originalname}`;
      cb(null, req.body.picPath);
    },
  });
  const upload = multer({ storage });



  app.post("/auth/register",upload.single("picture"),register) //stores the pic in public/assets
  app.post("/posts",verifyToken,upload.single("picture"),createPost);


  app.use("/auth",authRoutes);
  app.use("/users",userRoutes);
  app.use("/posts",postRoutes);
  app.use("/chat",chatRoutes);
  app.use("/message",messageRoutes);


  const PORT = process.env.PORT || 6001;
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => console.log(`Server Port: ${PORT} connected`));
  
      /* ADD DATA ONE TIME */
      // User.insertMany(users);
      // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));