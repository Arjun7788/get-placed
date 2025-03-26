import React, { useEffect, useState, useRef } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterRef = useRef(null);
  const [filterHeight, setFilterHeight] = useState("auto");

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) =>
        ["title", "description", "location"].some((key) =>
          job[key]?.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Update job card container height to match filter card
  useEffect(() => {
    if (filterRef.current) {
      setFilterHeight(`${filterRef.current.clientHeight}px`);
    }
  }, [filterJobs]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-6 flex-1 px-4 lg:px-6">
        <div className="flex flex-col md:flex-row gap-6 min-h-[80vh] h-full">
          {/* Sidebar Toggle for Mobile & iPad Pro */}
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="md:hidden bg-[#6A38C2] text-white py-2 px-4 rounded-md w-full text-center mb-4"
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sidebar Filter - Toggles Independently */}
          <div
            ref={filterRef}
            className={`md:w-1/3 lg:w-1/4 w-full transition-all duration-300 ${
              isFilterVisible ? "block" : "hidden md:block"
            }`}
          >
            <FilterCard />
          </div>

          {/* Job Listings - Always Visible */}
          <div className="flex-1 h-full flex flex-col">
            {filterJobs.length > 0 ? (
              <div
                className="overflow-y-auto custom-scrollbar"
                style={{ maxHeight: filterHeight }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg font-semibold">
                  No jobs found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar {
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #b0b0b0 transparent;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #b0b0b0;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #888;
          }
        `}
      </style>
    </div>
  );
};

export default Jobs;
