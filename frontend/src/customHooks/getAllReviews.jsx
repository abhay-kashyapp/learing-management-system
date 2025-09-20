// import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
// import { useDispatch } from 'react-redux'
// import { setReviewData } from '../redux/reviewSlice'
// import axios from 'axios'


// const getAllReviews = () => {
//   const dispatch = useDispatch()
 
//  useEffect(()=>{
//  const allReviews = async () =>{
//   try {
//     const result = await axios.get(serverUrl + "/api/review/getreview",{withCredentials:true})
//     dispatch(setReviewData(result.data))
//     console.log(result.data)
//   } catch (error) {
//     console.log(error)
//   }
//  }
//  allReviews()
//  },[])

// }

// export default getAllReviews


import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";
import axios from "axios";

const useGetAllReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/review/getreview",
          { withCredentials: true } // ✅ fix casing
        );

        // Log raw API data
        console.log("API Review Response:", result.data);

        // Ensure you're storing reviews, not courses
        dispatch(setReviewData(result.data || []));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [dispatch]);
};

export default useGetAllReviews;
