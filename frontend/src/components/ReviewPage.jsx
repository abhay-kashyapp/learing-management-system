


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";

function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState([]);

  useEffect(() => {
    if (reviewData && reviewData.length > 0) {
      setLatestReview(reviewData.slice(0, 6));
    }
  }, [reviewData]);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Real Reviews from Real Learners
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]">
        Discover how our Virtual Courses is transforming learning experiences
        through real feedback from students and professionals worldwide.
      </span>

      <div className="w-full flex items-center justify-center flex-wrap gap-6 lg:p-10 md:p-6 p-4 mb-10">
        {latestReview && latestReview.length > 0 ? (
          latestReview.map((review, index) => (
            <ReviewCard
              key={review?._id || index}
              comment={review?.comment || "No comment"}
              rating={review?.rating || 0}
              name={review?.user?.name || "Anonymous"}
              photoUrl={review?.user?.photoUrl || "/default-avatar.png"}
              courseTitle={review?.course?.title || "Untitled"}
              description={review?.user?.description || "No description available"}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewPage;
