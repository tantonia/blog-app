import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
        username: { type: String, required: true, min: 3, unique: true },
        password: { type: String, required: true },
    }, { timestamps: true }
);

export default mongoose.model('User', userSchema);