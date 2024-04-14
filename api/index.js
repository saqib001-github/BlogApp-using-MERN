import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config(); 

try { 

    await mongoose.connect(process.env.MONGO);
    console.log("Mongo DB is connected.");
} catch (err) {
    console.error('MongoDB connection error:', err);
}
 
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

app.listen(3000, () => {
    console.log(`Listining on port 3000 `);
});
 
