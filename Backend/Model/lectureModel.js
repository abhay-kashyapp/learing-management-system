// import mongoose from 'mongoose';

// const lectureSchema = new mongoose.Schema({
//   lectureTitle:{
//     type:String,
//     required:true
//   },

//   videoUrl:{
//     type:String,
//     required:false
//   },

//   isPreviewFree:{
//     type:Boolean,
//     default:true
//   },



// },{timestamps:true});

// const Lecture = mongoose.model('Lecture', lectureSchema);

// export default Lecture;


import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: { type: String, required: true },
    videoUrl: { type: String },               // set later in editLecture
    isPreviewFree: { type: Boolean, default: false },  // <- default locked
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
  },
  { timestamps: true }
);

const Lecture = mongoose.model('Lecture', lectureSchema);
export default Lecture;
