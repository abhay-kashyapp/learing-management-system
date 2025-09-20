import Course from "../Model/courseModel.js"
import Lecture from "../Model/lectureModel.js"
import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../Model/userModel.js"


export const createCourse = async (req,res) => {
  try {
        const {title,category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title and category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        
        return res.status(201).json(course)
    } catch (error) {
         return res.status(500).json({message:`Create course error ${error}`})
    }
}



export const getPublishedCourses = async (req,res) => {
    try {
           const courses = await Course.find({isPublished:true}).populate("lectures reviews")
            
          if(!courses)
           {
               return res.status(404).json({message:"Courses is not found"})
           }
   
           return res.status(200).json(courses)
           
       } catch (error) {
             return res.status(500).json({message:`Failed to get published courses ${error}`})
       } 
}




export const getCreatorCourses = async (req,res) => {
try {
    const userId = req.userId
           const courses = await Course.find({creator:userId})
           if(!courses)
           {
               return res.status(404).json({message:"Course is not found"})
           }
           return res.status(200).json(courses)
} catch (error) {
   return res.status(500).json({message:`Failed to get creator courses ${error}`})
}
 
}



export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {title , subTitle , description , category , level , price , isPublished } = req.body;
        let thumbnail
         if(req.file){
            thumbnail =await uploadOnCloudinary(req.file.path)
                }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course is not found"})
        }
        const updateData = {title , subTitle , description , category , level , price , isPublished ,thumbnail}

        course = await Course.findByIdAndUpdate(courseId , updateData , {new:true})
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to update course ${error}`})
    }
}



// export const getCourseById = async (req,res) => {
//     try {
//         const {courseId} = req.params
//         let course = await Course.findById(courseId)
//         if(!course){
//             return res.status(404).json({message:"Course not found"})
//         }
//          return res.status(200).json(course)
        
//     } catch (error) {
//         return res.status(500).json({message:`Failed to get course ${error}`})
//     }
// }
 
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    let course = await Course.findById(courseId)
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name photoUrl role" }
      })
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get course ${error}` });
  }
};






export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:`Failed to remove course ${error}`})
  }
};




// lectures 

// export const createLecture = async (req,res) => {
//   try {
//     const {lectureTitle} = req.body
//     const {courseId} = req.params
//     if(!lectureTitle || !courseId){
//         return res.status(400).json({message:"lectureTitle and courseId is required"})
//     }
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({message: "Course not found"});
//     }
//     // Ensure lectures array exists
//     if (!Array.isArray(course.lectures)) {
//       course.lectures = [];
//     }
//     // Pass required fields to Lecture.create if needed
//     const lecture = await Lecture.create({lectureTitle, course: courseId});
//     course.lectures.push(lecture._id);
//     await course.save();
//     await course.populate("lectures");

//     return res.status(201).json({lecture,course});
//   } catch (error) {
//       return res.status(500).json({message:`Failed to create lecture ${error}`})
//   }
// }

export const createLecture = async (req,res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lectureTitle and courseId is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure lectures array exists
    if (!Array.isArray(course.lectures)) {
      course.lectures = [];
    }

    // ✅ If this is the first lecture in the course → set isPreviewFree = true
    const isPreviewFree = course.lectures.length === 0;

    const lecture = await Lecture.create({
      lectureTitle,
      course: courseId,
      isPreviewFree
    });

    course.lectures.push(lecture._id);
    await course.save();
    await course.populate("lectures");

    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res.status(500).json({ message: `Failed to create lecture ${error}` });
  }
};



export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
      await  course.populate("lectures");
      await course.save();
      return res.status(200).json(course);

    } catch (error) {
     return res.status(500).json({ message: `Failed to get course lectures ${error}` });
    }
};




export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { isPreviewFree, lectureTitle } = req.body;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        
        
        if (req.file) {
         const   videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl;
        }
        if (lectureTitle) {
            lecture.lectureTitle = lectureTitle;
        }
        if (typeof isPreviewFree !== "undefined") {
            lecture.isPreviewFree = isPreviewFree;
        }

        await lecture.save();
        return res.status(200).json(lecture);

    } catch (error) {
        return res.status(500).json({ message: `Failed to edit lecture ${error}` });
    }
}



export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        
        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        );
        return res.status(200).json({ message: "Lecture Removed Successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Failed to remove lecture ${error}` });
    }
};



// get creator

export const getCreatorById = async (req,res) => {
 try {
    const {userId} = req.body

    const  user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
 } catch (error) {
    return res.status(500).json({ message: `Failed to get creator ${error}` });
 }
}