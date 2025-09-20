// import React, { useEffect, useState } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import {useNavigate} from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { setSelectedCourse } from '../redux/courseSlice';
// import img from '../assets/empty.jpg'
// import { FaStar } from "react-icons/fa6";
// import { useRef } from 'react';
// import { FaLock, FaPlayCircle } from "react-icons/fa";
// import axios from 'axios';
// //import {creatorCourse} from '../redux/courseSlice';
// import { serverUrl } from '../App'; 
// import Card from '../components/Card.jsx';


// function ViewCourses() {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {courseId} = useParams();
//   const {selectedCourse} = useSelector((state) => state.course);
//   const {courseData} = useSelector((state) => state.course);
//   const [selectedLecture, setSelectedLecture] = useState(null); 
//   const [creatorData, setCreatorData] = useState(null);
//   const [creatorCourses,setCreatorCourses] = useState([]);
//   const {userData} = useSelector((state) => state.user);


//   const fetchCourseData = async () => {
//     courseData.forEach((course) => {
//       if (course._id === courseId) {
//         dispatch(setSelectedCourse(course));
//       }
//     });
//   }

//   useEffect(() => {
  
//    const handleCreator = async() => {
//   useEffect(() => {
//     const handleCreator = async () => {
//       if (selectedCourse?.creator) {
//         try {
//           const result = await axios.post(serverUrl + "/api/course/creator", { userId: selectedCourse.creator }, { withCredentials: true });
//           setCreatorData(result.data);
//         } catch (error) {
//           console.log("Error fetching creator data:", error);
//         }
//       }
//     };
//     if (selectedCourse) {
//       handleCreator();
//     }
//   }, [selectedCourse]);
//     fetchCourseData();
//   }, [courseData, courseId]);



//  useEffect(()=>{
//  if (creatorData?._id && courseData.length > 0) {
//   const creatorCourse = courseData.filter((course) => course.creator === creatorData?._id && course._id !== courseId);
//    setCreatorCourses(creatorCourse);
//  }

//  },[creatorData,courseData])



//  const handleEnroll = async (userId,courseId) => {
//    try {
//     const orderData = await axios.post(serverUrl + "/api/order/razorpay-order", { userId, courseId }, { withCredentials: true });
//     console.log(orderData);
//    } catch (error) {
//     console.log("Error in handleEnroll:", error);
//    }
//  }



//   return (
//     <div className="min-h-screen bg-gray-50 p-6" >
//       <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>

//       {/* top section */}
//       <div className="flex flex-col md:flex-row gap-6 ">

//        {/* thumbnail */}
//        <div className='w-full md:w-1/2'>
//          <FaArrowLeftLong  className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
//          {selectedCourse?.thumbnail ? <img src={selectedCourse.thumbnail} alt="" className='rounded-xl w-full object-cover' /> : <img src={img} alt='' className='rounded-xl w-full object-cover'/>}
//        </div>

//       {/* course info */}
//       <div className="flex-1 space-y-2 mt-[20px]">
//         <h2 className="text-xl font-bold">{selectedCourse?.title}</h2>
//         <p className="text-gray-600">{selectedCourse?.subTitle}</p>
       
//        <div className='flex items-start flex-col justify-between'>

//             <div className='text-yellow-500 font-medium flex gap-2'>
//               <span className='flex items-center justify-start gap-1'><FaStar/>{" "}5</span>
//               <span className='text-gray-400'>(1200 Reviews)</span>
//             </div>

//             <div>
//              <span className='text-lg font-semibold text-black'>₹{selectedCourse?.price}</span>{" "}
//              <span className='line-through text-sm text-gray-400'>₹599</span>
//             </div>

//             <ul className='text-sm text-gray-700 space-y-1 pt-2'>
//                <li>✅ 10+ hours of video content</li>
//               <li>✅ Lifetime access to course materials</li>
//             </ul>

//             <button className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer" onClick={()=> handleEnroll(userData._id,courseId)}>
//               Enroll Now
//             </button>

//        </div>

//       </div>


//       </div>


//       <div>
//             <h2 className="text-xl font-semibold mb-2">What You’ll Learn</h2>
//             <ul className="list-disc pl-6 text-gray-700 space-y-1">
//             <li>Learn {selectedCourse?.category} from Beginning</li>
//           </ul>
//       </div>


//       {/* Requirements */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Requirements</h2>
//           <p className="text-gray-700">Basic programming knowledge is helpful but not required.</p>
//         </div>

//         {/* Who This Course Is For */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
//           <p className="text-gray-700">
//             Beginners, aspiring developers, and professionals looking to upgrade skills.
//           </p>
//         </div>
//           <div className='flex flex-col md:flex-row gap-6'>
//           <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
//           <h2 className="text-xl font-bold mb-1 text-gray-800">Course Curriculum</h2>
//            <p className="text-sm text-gray-500 mb-4">{selectedCourse?.lectures?.length} Lectures</p>

//            <div className='flex flex-col gap-3'>
//             {selectedCourse?.lectures?.map((lecture,index) =>(
//               <button key={index} 
//               disabled={!lecture.isPreviewFree}

//                 onClick={() => {
//                   if(lecture.isPreviewFree){
//                  setSelectedLecture(lecture);          
//                 }}}
//                 className = {`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left  ${lecture.isPreviewFree? "hover:bg-gray-100 cursor-pointer border-gray-300"
//                 : "cursor-not-allowed opacity-60 border-gray-200"} 
//                 ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : "" }`}>
//                   <span className='text-lg text-gray-700'>{lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}</span>
//                   <span className='text-sm font-medium text-gray-800'>{lecture?.lectureTitle}</span>
//                 </button>
//               ))}
//            </div>
//       </div>  


//       <div className='flex flex-col gap-4 bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
//       <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
//         {selectedLecture?.videoUrl ? <video className="w-full h-full object-cover" src={selectedLecture?.videoUrl} controls /> :
//          <span className='text-white text-sm'>
//           Select a Preview Lecture to Watch
//         </span>

//         }
//       </div>
//       </div>
//     </div>
     
         

//          <div className='mt-8 border-t pt-6'>
//            <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
//            <div className="mb-4">
//             <div className="flex gap-1 mb-2">
//               {
//                 [1,2,3,4,5].map((star) => (
//                   <FaStar key={star} className='fill-gray-300   '/>
//                 ))
//               }
//             </div>
//            <textarea name='' className='w-full border border-gray-300 rounded-lg p-2'
//            placeholder='Write your review here...'
//            rows={3}
//            />

//            <button className='bg-black text-white px-4 py-2 rounded mt-3 hover:bg-gray-800'>
//              Submit Review
//            </button>
//            </div>
//          </div>


//          {/* for creator Info */}
//          <div className='flex items-center gap-4 pt-4 border-t '>
//           {creatorData?.photoUrl? <img src={creatorData?.photoUrl} alt="" className='w-16 h-16 border-1 border-gray-200 rounded-full object-cover' />:  <img src={img} alt="" className='w-16 h-16 rounded-full object-cover border-1 border-gray-200' />}
          
//           <div>
//           <h2 className="text-xl font-semibold ">{creatorData?.name}</h2>
//           <p className="md:text-sm text-[10px] text-gray-600">Name: {creatorData?.description}</p>
//           <p className="md:text-sm text-[10px] text-gray-600">Email: {creatorData?.email}</p>
//           </div>
         
//          </div>


//          <div>
//           <p className="text-xl font-semibold mb-2">Other Published Courses by the Educator</p>
//          </div>
         
//          <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
//           {
//             creatorCourses?.map((course,index)=>{
//             return(  <Card key={index} thumbnail={course.thumbnail} id={course._id} title={course.title} price={course.price} category={course.category}/>
//             )
//             })
//           }
//          </div>

//       </div>

//     </div>
//   )
// }

// export default ViewCourses



import { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaStar, FaLock} from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCourse } from '../redux/courseSlice';
import img from '../assets/empty.jpg';
import axios from 'axios';
import { serverUrl } from '../App'; 
import Card from '../components/Card.jsx';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';



function ViewCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { selectedCourse, courseData } = useSelector((state) => state.course);
  const [selectedLecture, setSelectedLecture] = useState(null); 
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [loading,setLoading] = useState(false)

  



  // ✅ fetch selected course
  const fetchCourseData = async () => {
    courseData.forEach((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
      }
    });
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseData, courseId]);

  // ✅ fetch creator data (SEPARATE useEffect)
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log("Error fetching creator data:", error);
        }
      }
    };
    if (selectedCourse) {
      handleCreator();
    }
  }, [selectedCourse]);




   const checkEnrollment = () =>{
    const verify = userData?.enrolledCourses?.some(c => ( typeof c === 'string' ? c : c._id).toString() === courseId?.toString());
    if(verify){
      setIsEnrolled(true);
    }
    
   
   }





  // ✅ fetch other courses by creator
  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) => course.creator === creatorData?._id && course._id !== courseId
      );
      setCreatorCourses(creatorCourse);
      checkEnrollment();
    }

  }, [creatorData, courseData, courseId,userData]);



  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpay-order",
        { userId, courseId },
        { withCredentials: true }
      );
      console.log(orderData);
     
      const options = {
        key : import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : orderData.data.order.amount,
        currency:"INR",
        name:"VIRTUAL COURSES",
        description:"COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.order.id,

        handler: async (response) => {
          console.log("Razorpay response:", response);

          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/order/verifypayment",
              { ...response,courseId, userId},
              { withCredentials: true }
            );
            setIsEnrolled(true);
            console.log("userId being sent to verifyPayment:", userId);


            toast.success(verifyPayment.data.message);
            console.log("Payment verification response:", verifyPayment.data);
          } catch (error) {
            //toast.error(error.response.data.message)
            toast.error(error.response?.data?.message || "Payment verification failed ❌");
          }

        }
        
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log("Error in handleEnroll:", error);
      toast.error("something went wrong while enrolling");
    }
  };




   const handleReview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/review/createreview",{rating ,comment ,courseId},{withCredentials:true})
      setLoading(false)
      toast.success("Review Added")
      console.log(result.data)
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)  
      setComment("")    
    }
   }


   const calculateAvgReview =  (reviews) => {
    if(!reviews || reviews.length === 0){
      return 0;
    }
    const total = reviews.reduce((sum,review) => sum + review.rating, 0)
    return (total/reviews.length).toFixed(1)
    }


    const avgRating = calculateAvgReview(selectedCourse?.reviews);

   


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
        
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* thumbnail */}
          <div className='w-full md:w-1/2'>
            <FaArrowLeftLong size={22} className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")}/>
            {selectedCourse?.thumbnail ? (
              <img src={selectedCourse.thumbnail} alt="" className='rounded-xl w-full object-cover' />
            ) : (
              <img src={img} alt='' className='rounded-xl w-full object-cover'/>
            )}
          </div>

          {/* course info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>
            <div className='flex items-start flex-col justify-between'>
              <div className='text-yellow-500 font-medium flex gap-2'>
                <span className='flex items-center justify-start gap-1'><FaStar/>{avgRating}</span>
                <span className='text-gray-400'>(1200 Reviews)</span>
              </div>
              <div>
                <span className='text-lg font-semibold text-black'>₹{selectedCourse?.price}</span>{" "}
                <span className='line-through text-sm text-gray-400'>₹599</span>
              </div>
              <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>
              {!isEnrolled ? 
              <button 
                className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                onClick={() => handleEnroll(userData._id, courseId)}
              >
                Enroll Now
              </button> : <button 
                className="bg-green-200 text-green-600 px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
               onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button> }
            </div>
          </div>
        </div>

        {/* What you’ll learn */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What You’ll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700">Basic programming knowledge is helpful but not required.</p>
        </div>

        {/* Who this is for */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade skills.
          </p>
        </div>

        {/* Curriculum + video */}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">Course Curriculum</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedCourse?.lectures?.length} Lectures</p>

            {/* <div className='flex flex-col gap-3'>
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left 
                    ${lecture.isPreviewFree ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                    : "cursor-not-allowed opacity-60 border-gray-200"} 
                    ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : "" }`}
                >
                  <span className='text-lg text-gray-700'>
                    {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                  </span>
                  <span className='text-sm font-medium text-gray-800'>{lecture?.lectureTitle}</span>
                </button>
              ))}
            </div> */}


              <div className='flex flex-col gap-3'>
  {selectedCourse?.lectures?.map((lecture, index) => {
    const isAccessible = isEnrolled || lecture.isPreviewFree;

    return (
      <button
        key={index}
        disabled={!isAccessible}
        onClick={() => {
          if (isAccessible) {
            setSelectedLecture(lecture);
          }
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left 
          ${isAccessible
            ? "hover:bg-gray-100 cursor-pointer border-gray-300"
            : "cursor-not-allowed opacity-60 border-gray-200"} 
          ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : "" }`}
      >
        <span className='text-lg text-gray-700'>
          {isAccessible ? <FaPlayCircle /> : <FaLock />}
        </span>
        <span className='text-sm font-medium text-gray-800'>{lecture?.lectureTitle}</span>
      </button>
    );
  })}
</div>






          </div>

          <div className='flex flex-col gap-4 bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
            <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
              {selectedLecture?.videoUrl ? (
                <video className="w-full h-full object-cover" src={selectedLecture?.videoUrl} controls />
              ) : (
                <span className='text-white text-sm'>Select a Preview Lecture to Watch</span>
              )}
            </div>
          </div>
        </div>

        {/* Review section */}
        <div className='mt-8 border-t pt-6'>
          <h2 className="text-xl font-semibold mb-2">Write a Review</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map((star) => (
                <FaStar key={star}
                onClick={() => setRating(star)} className={star <= rating ? "fill-amber-300" : "fill-gray-300"} />
              ))}
            </div>
            <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Write your review here...'
              rows={3}
            />
            <button className='bg-black text-white px-4 py-2 rounded mt-3 hover:bg-gray-800' disabled={loading}  onClick={handleReview}>
             {loading ? <ClipLoader size={30} color='white'/> : "Submit Review"}
            </button>
          </div>
        </div>

        {/* Creator info */}
        <div className='flex items-center gap-4 pt-4 border-t '>
          {creatorData?.photoUrl ? (
            <img src={creatorData?.photoUrl} alt="" className='w-16 h-16 border-1 border-gray-200 rounded-full object-cover' />
          ) : (
            <img src={img} alt="" className='w-16 h-16 rounded-full object-cover border-1 border-gray-200' />
          )}
          <div>
            <h2 className="text-xl font-semibold ">{creatorData?.name}</h2>
            <p className="md:text-sm text-[10px] text-gray-600">Name: {creatorData?.description}</p>
            <p className="md:text-sm text-[10px] text-gray-600">Email: {creatorData?.email}</p>
          </div>
        </div>

        {/* Other courses */}
        <div>
          <p className="text-xl font-semibold mb-2">Other Published Courses by the Educator</p>
        </div>
        <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
          {creatorCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              title={course.title}
              price={course.price}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourses;

