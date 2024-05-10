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
app.use('/', async(req,res) => {
    try {
        res.json('hello from server')
    } catch(error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));