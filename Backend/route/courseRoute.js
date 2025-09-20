import express from 'express';
import { createCourse, getCourseById, removeCourse, getPublishedCourses, getCreatorCourses, editCourse, createLecture, getCourseLecture, editLecture, removeLecture, getCreatorById } from '../controllers/courseController.js';
import isAuth from '../middleware/isAuth.js'
import upload from "../middleware/multer.js"
import { searchWithAi } from "../controllers/searchController.js";



const courseRouter = express.Router();
// for courses
courseRouter.post('/create', isAuth,createCourse);
courseRouter.get('/getpublishedcourses', getPublishedCourses);
courseRouter.get('/getcreatorcourses', isAuth, getCreatorCourses);
courseRouter.post('/editcourse/:courseId', isAuth, upload.single('thumbnail'), editCourse);
courseRouter.get('/getcoursebyid/:courseId',isAuth,getCourseById);
courseRouter.delete('/removecourse/:courseId', isAuth, removeCourse);


// for lectures
courseRouter.post("/createlecture/:courseId",isAuth,createLecture);
courseRouter.get("/getcourselecture/:courseId",isAuth,getCourseLecture);
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single('videoUrl'),editLecture);
courseRouter.delete("/removelecture/:lectureId",isAuth,removeLecture);
courseRouter.post("/creator",isAuth,getCreatorById);


// for search
courseRouter.post("/search",searchWithAi)

export default courseRouter;