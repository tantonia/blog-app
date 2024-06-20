import { updatePost, createPost, getAllPost, getSinglePost, deletePost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import express from 'express';

export const postRouter = express.Router();
export const postRouterUpload = express.Router();
postRouter.get("/", getAllPost);
postRouter.get("/:id", getSinglePost);
postRouterUpload.post("/create", verifyToken, createPost);
postRouterUpload.patch("/update/:id", verifyToken, updatePost);
postRouterUpload.delete("/delete/:id", verifyToken, deletePost);

export default postRouter;