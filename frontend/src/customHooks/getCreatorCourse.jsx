import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatorCourseData } from '../redux/courseSlice';
import { toast } from 'react-toastify';


function getCreatorCourse() {
 const dispatch = useDispatch();
 const {userData} = useSelector(state => state.user);

  return (
    
    useEffect(() => {
      const createorCourses = async () => {
        try {
          const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true });
          console.log(result.data);
          dispatch(setCreatorCourseData(result.data)); 

        } catch (error) {
          console.error(error);
          toast.error(error.response.data.message);
        }
      }
      createorCourses();
    }, [userData])
  )
}

export default getCreatorCourse
