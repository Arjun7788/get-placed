import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h1 className="font-extrabold text-2xl text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <Badge
              className="text-blue-700 font-semibold px-3 py-1"
              variant="outline"
            >
              {singleJob?.postion} Positions
            </Badge>
            <Badge
              className="text-[#F83002] font-semibold px-3 py-1"
              variant="outline"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className={`font-semibold px-3 py-1 ${
                singleJob?.salary > 0 ? "text-[#7209b7]" : "text-red-600"
              }`}
              variant="outline"
            >
              {singleJob?.salary > 0 ? "Paid" : "Unpaid"}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-5 py-2 text-white font-semibold transition-all duration-300 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#7209b7] to-[#5f32ad] hover:from-[#5f32ad] hover:to-[#7209b7]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details Section */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="border-b-2 border-gray-300 font-semibold text-lg pb-2 mb-4 text-gray-700">
          Job Description
        </h1>

        <div className="space-y-4 text-gray-800">
          <h1 className="font-semibold text-lg">
            Role:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Location:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Description:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Internship Duration:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.experience} 3-6 months
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Stipend:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.salary > 0 ? `₹${singleJob?.salary}` : "Unpaid"}
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Total Applicants:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-semibold text-lg">
            Posted Date:{" "}
            <span className="pl-3 font-normal text-gray-600">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
