const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  value: {
    type: String,
    trim: true,
    required: "Option text is required!",
  },
  isRight: {
    type: Boolean,
    required: "isRight is required!",
  }
})

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: "Question text is required!",
  },
  positiveMarks: {
    type: Number,
    required: "positiveMarks is required!",
  },
  negativeMarks: {
    type: Number,
    required: "negativeMarks is required!",
  },
  timeInSeconds: {
    type: String,
    trim: true,
    required: "timeInSeconds is required!",
  },
  questionImage: {
    type: String,
    trim: true,
    required: "questionImage is required!",
  },
  explaination:{
    type: String,
    trim: true,
    required: "explaination is required!",
  },
  options: [optionSchema]
})

const quizSchema = mongoose.Schema({
  quizName: {
    type: String,
    trim: true,
    required: "Quiz title is required!",
  },
  totalTimeInMinutes: {
    type: String,
    trim: true,
    required: "Total time is required!",
  },
  totalScore: {
    type: Number,
    required: "Total score is required!",
  },
  totalQuestions: {
    type: Number,
    required: "Total question number is required!",
  },
  quizImage: {
    type: String,
    trim: true,
    required: "Quiz image is required!",
  },
  description:{
    type:String,
    trim:true,
    required:"Description is required!",
  },
  questionsList: [questionSchema]
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = { Quiz };