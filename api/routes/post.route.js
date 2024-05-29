import { updatePost, createPost, getAllPost, getSinglePost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import express from 'express';

export const postRouter = express.Router();
export const postRouterUpload = express.Router();
postRouterUpload.post("/create", verifyToken, createPost);
postRouterUpload.patch("/update/:id", verifyToken, updatePost);
postRouter.get("/", getAllPost);
postRouter.get("/:id", getSinglePost);

export default postRouter;