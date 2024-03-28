import User from '../user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import  Jwt  from 'jsonwebtoken';
export const signup= async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username==='' || email==='' || password===''){
        next(errorHandler(400,"All Feilds are required!"));
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser =new User({
        username,email,password:hashedPassword
    })
    try {
        await newUser.save();
        res.json("signup successful");
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        next(errorHandler(400,'All fields are required!'));
    }
    try {
        const validUserId=await User.findOne({email});
        if(!validUserId){
            return next(errorHandler(404,"User not found!"));
        }
        const validPassword=bcryptjs.compareSync(password,validUserId.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'));
        }
        //hiding password from the response 
        const {password:pass,...rest}=validUserId._doc;
        const token=Jwt.sign({id: validUserId._id},process.env.JWT_SECRET);
        res.status(200).cookie('access_token',token,{
            httpOnly:true,
        }).json(rest);
    } catch (error) {
        next(error);
    }
}