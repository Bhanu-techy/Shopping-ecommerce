import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import userSChema from './models/User.js'
import productSchema from "./models/Product.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(cors())

dotenv.config();
connectDB();


app.use(express.json());

app.listen(5000, () => console.log("Server running"));

app.get("/api/users", async (req, res) =>{
    const userData = await userSChema.find()
    res.json(userData)
})

app.get("/api/products", async (req, res) => {
    const products = await productSchema.find()
    res.json(products)
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userSChema.findOne({ email });
    
        if (!user) return res.status(400).json({ message: "Invalid email" });
        const isMatch = (password=== user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await userSChema.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const user = await userSChema.create({
            name,
            email,
            password,
        });

        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
