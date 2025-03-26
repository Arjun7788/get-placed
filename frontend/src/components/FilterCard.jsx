import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Tech Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "Mobile App Developer",
    ],
  },
  {
    filterType: "Tech Stack",
    array: [
      "React.js",
      "Angular",
      "Node.js",
      "Django",
      "Spring Boot",
      "Swift",
      "Kotlin",
      "Flutter",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.filteredJobs || []);

  const changeHandler = (value) => {
    // If the clicked value is already selected, reset the filter
    setSelectedValue((prev) => (prev === value ? "" : value));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue)); // Dispatch an empty string when no filter is selected
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <div className="w-full bg-[#5A189A] p-5 rounded-xl shadow-lg text-white">
        <h1 className="font-bold text-2xl text-center mb-4 text-yellow-400">
          Filter Internships
        </h1>
        <hr className="border-yellow-500/50 mb-4" />

        {/* Scrollable filter section */}
        <div className="flex flex-col gap-4">
          {filterData.map((data, index) => (
            <div
              key={index}
              className="bg-[#4A148C] p-4 rounded-lg shadow-md border border-yellow-500/40"
            >
              <h2 className="font-semibold text-lg mb-2 border-b pb-1 border-yellow-400 text-yellow-300">
                {data.filterType}
              </h2>

              {/* Scrollable Container for Filters */}
              <div
                className="flex flex-col gap-2 max-h-[160px] overflow-y-auto px-2 pr-3"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255, 193, 7, 0.6) transparent",
                }}
              >
                {data.array.map((item, idx) => {
                  const isSelected = selectedValue === item;
                  return (
                    <div
                      key={idx}
                      onClick={() => changeHandler(item)}
                      className={`flex items-center justify-between p-2 rounded-lg transition cursor-pointer text-white ${
                        isSelected
                          ? "bg-yellow-500/90 text-[#1B1B1B] font-semibold border border-yellow-600 shadow-lg scale-105"
                          : "bg-yellow-300/30 hover:bg-yellow-400/50"
                      }`}
                    >
                      <span>{item}</span>
                      {isSelected && (
                        <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg animate-pulse"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
