import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./configurations/db.js";
import dotenv from "dotenv";
import ratelimit from "./configurations/upstash.js";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
dotenv.config()

const app=express();
const PORT = process.env.PORT || 5001;

//middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://deploy-mern-app-1-api.vercel.app/api"
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

//app.use(bodyParser.json());
app.use(express.json());
// Trust proxy to get correct IP addresses
app.set('trust proxy', 1);
app.use(ratelimiter);

app.use("/api/auth", authRoutes); 
app.use("/api/notes",notesRoutes);


connectDB().then(()=>{
    app.listen(PORT,() =>{
        console.log("Server started on port:",PORT);
    });
});

