const express = require("express");
const Router=express.Router();
const {Quiz}=require('../model/quiz.model.js');

Router.get('/',async (req,res) =>{
  try{
    let quizes=await Quiz.find({}).select('_id quizName totalTimeInMinutes totalScore totalQuestions quizImage description questionsList');
    res.status(200).json({success:true,quizList:quizes});
  }catch(error){
    res.status(401).json({success:false,error})
  }
})

Router.post('/',async(req,res) =>{
  console.log(req.body);
  try{
    const quiz=new Quiz(req.body);
    let savedQuiz=quiz.save();
    res.status(200).json({success:true})
  }catch(err){
    res.status(400).json({success:false,error:err})
  }
})

Router.get('/:id',async(req,res) =>{
  try{
    let { id } = req.params;
    console.log(id);
    const quiz = await Quiz.findById(id, '_id quizName totalTimeInMinutes totalScore totalQuestions quizImage description questionsList');
    res.json({
      success: true,
      quiz
    });

  }catch(err){
    res.status(400).json({success:false,error:err})
  }
  
})

module.exports = Router;