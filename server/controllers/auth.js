import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const register=async(req,res)=>{
    try {
        let  {
            firstName,
            lastName,
            email,
            password,
            picPath,
            friends,
            location,
            occupation
        }=req.body;
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        if(typeof(picPath)!=="string") picPath=picPath[0];

        const newUser=new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picPath,
            friends,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0
        })
        const saveUser=await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message});
    }
};


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist!"})

        const isMatched=await bcrypt.compare(password,user.password);
        if(!isMatched) return res.status(400).json({msg:"Kindly enter correct credentials."})

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

        delete user.password;

        res.status(200).json({token,user})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}