// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: function(){
//         return !this.googleAuth;
//       }

//     },

//     googleAuth: {
//   type: Boolean,
//   default: false
// },

//     role: {
//       type: String,
//       enum: ["student", "educator"],
//       required: true,
//     },

//     photoUrl: {
//       type: String,
//       default: ""
//     },

//     enrolledCourses: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course"
//     }],
    
//     resetOtp :{
//       type:String
//     },

//     otpExpires:{
//       type:Date
//     },

//     isOtpVerifed:{
//       type:Boolean,
//       default:false
//     }




//   },
//   {
//     timestamps: true // ✅ moved to schema options
//   }
// );

// // const User = mongoose.model("User", userSchema);
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;



import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [function () {
        // agar user ne Google se login kiya hai to password required nahi hoga
        return !this.googleAuth;
      } ,"Password is required unless using Google Auth"],
    },

    googleAuth: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["student", "educator"],
      required: true,
    },

    photoUrl: {
      type: String,
      default: "",
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    resetOtp: {
      type: String,
    },

    otpExpires: {
      type: Date,
    },

    isOtpVerifed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt automatic
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

