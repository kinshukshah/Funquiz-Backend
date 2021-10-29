const express = require('express');
const Router = express.Router();
const {User}=require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require('lodash');

Router.get('/:userId',async (req,res) =>{
  try{
    let {userId}=req.params;
    let user=await User.findById({_id:userId});

    user ? res.status(200).json({success:true,user:_.pick(user,['email','name','_id','takenQuizList'])}):res.status(400).json({success:false,error:"User not found"});
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
})

Router.post('/saveQuizResults/:userId',async (req,res) =>{
  try{
   let {userId}=req.params;
   let user=await User.findOne({ userId:userId });
   if(user){
     user.takenQuizList.push(req.body);
     user=await user.save();
     res.status(200).json({success:true,user:_.pick(user,['email','name','_id','takenQuizList'])})
   }else{
     res.status(400).json({success:false,error:"User not found"});
   }
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
})

Router.post('/login',async (req, res) => {
  let { email, password } = req.body;
  try{
  const user = await User.findOne({ email });
  if(user){
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.status(200).json({success:true,user:_.pick(user,['_id',"email","name","takenQuizList"])})
      } else {
        res.status(400).json({ success:false,error: "Invalid Password" });
      }
  }else {
      res.status(401).json({ success:false,error: "User does not exist" });
  }
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
});

Router.post('/register',async (req, res) => {
  const{body}=req;
  if(!(body.email && body.password && body.name)){
    return res.status(400).json({success:false,message:"Data not formatted properly"})
  }
  const user=new User(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).json({success:true,user:_.pick(doc,['_id','email','name','takenQuizList'])}));
});

module.exports = Router;