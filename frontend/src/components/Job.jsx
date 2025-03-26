import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job = {} }) => {
  const navigate = useNavigate();
  const detailsRef = useRef(null);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-5 rounded-lg shadow-md bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg h-full">
      {/* Date Section */}
      <div className="flex items-center justify-between text-gray-500 text-[10px] sm:text-xs">
        <p>
          {job?.createdAt
            ? new Date(job.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date Unavailable"}
        </p>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-2 my-2">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src={job?.company?.logo || "/default-logo.png"} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm sm:text-base">
            {job?.company?.name || "Unknown Company"}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-500">
            {job?.company?.city || "Location Unavailable"}
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-sm sm:text-base mb-1 text-[#333]">
          {job?.title || "No Title"}
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Job Details (Scrollable) */}
      <div
        ref={detailsRef}
        className="overflow-y-auto max-h-40 mt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <div className="flex flex-wrap gap-1">
          <Badge
            className="text-blue-700 font-bold border-blue-700 text-[10px] sm:text-xs whitespace-nowrap"
            variant="ghost"
          >
            {job?.position
              ? `${job.position} Positions`
              : "Position Unavailable"}
          </Badge>
          <Badge
            className="text-orange-500 font-bold border-orange-500 text-[10px] sm:text-xs whitespace-nowrap"
            variant="ghost"
          >
            {job?.jobType || "Type Unavailable"}
          </Badge>
          <Badge
            className={`font-bold text-[10px] sm:text-xs bg-transparent border whitespace-nowrap ${
              Number(job?.salary) > 0
                ? "text-green-600 border-green-600"
                : "text-red-600 border-red-600"
            }`}
            variant="ghost"
          >
            {Number(job?.salary) > 0 ? "Paid" : "Unpaid"}
          </Badge>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-3 sm:mt-4">
        <Button
          onClick={() => job?._id && navigate(`/description/${job?._id}`)}
          className="w-full bg-[#E2E8F0] text-gray-700 font-medium py-1.5 sm:py-2 rounded-md hover:bg-[#CBD5E1] transition duration-300 text-[10px] sm:text-xs"
          disabled={!job?._id} // Disable button if ID is missing
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
