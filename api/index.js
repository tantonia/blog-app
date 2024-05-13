import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {dirname} from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cookieParser());
const corsOptions = {
    origin: function(origin, callback) {
        if(!origin) return callback(null, true);
        if (process.env.ALLOWED_ORIGINS) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cd(null, path.join(__dirname, 'public'))
    }, filename: (req, file, cb) => {
        cb(null, Date.now() +path.extname(file.originalname));
    }
});
export const upload = multer({storage});
app.use((req, res, next) => {
    req.upload = upload;
    next();
})
mongoose
    .connect(process.env.MONGO)
    .then(() => { console.log('connected to MongoDB!');
    })
    .catch((err) => console.log(err));
app.use('/', async(req,res) => {
    try {
        res.json('hello from server')
    } catch(error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));