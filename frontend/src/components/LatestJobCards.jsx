import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-200 
      cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 
      w-full"
    >
      {/* Company Name & Location */}
      <div>
        <h1 className="font-medium text-sm sm:text-base md:text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">India</p>
      </div>

      {/* Job Title */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-2">
          {job?.title}
        </h1>
      </div>

      {/* Job Details Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="font-bold text-blue-700 border border-blue-500 bg-gray-100 px-3 py-1 rounded-md text-xs sm:text-sm">
          {job?.position} Positions
        </Badge>
        <Badge className="font-bold text-orange-700 border border-orange-500 bg-gray-100 px-3 py-1 rounded-md text-xs sm:text-sm">
          {job?.jobType}
        </Badge>
        <Badge
          className={`font-bold px-3 py-1 rounded-md transition-colors border bg-gray-100 text-xs sm:text-sm ${
            job?.salary > 0
              ? "text-green-700 border-green-500 hover:bg-green-100"
              : "text-red-700 border-red-500 hover:bg-red-100"
          }`}
        >
          {job?.salary > 0 ? "Paid" : "Unpaid"}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
