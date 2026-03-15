import mongoose from "mongoose";

//Job desc
//resume text
//self description
//ai generated -tech ques,behavi ques, skill gaps, preparation plan [{day 1}]

const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Technical intention is required"],
    },
    intention: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const behaviourialQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behaviour question is required"],
    },
    intention: {
      type: String,
      required: [true, "Behaviour intention is required"],
    },
    intention: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);


const skillSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum:["low","mid","high"],
      required: [true, "Severity is required"],
    }
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required" ]
    } ]
})

const reportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 0,
  },
  technicalQuestions :[technicalQuestionsSchema],
  behavioralQuestions :[behaviourialQuestionsSchema],
  skills :[skillSchema],
  preparationPlan :[preparationPlanSchema],
  users:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
  
});

const reportModel = mongoose.model("report",reportSchema)

export default reportModel