import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() === "") return; // Prevent empty searches
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="relative bg-purple-900 text-white text-center py-24 px-6 lg:py-32">
      <div className="absolute inset-0 bg-purple-900 opacity-90"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8">
          Find the Right <span className="text-yellow-400">Internship</span>
        </h1>

        <div className="flex items-center bg-purple-700 rounded-full shadow-lg overflow-hidden w-full max-w-3xl mx-auto p-2 md:p-3">
          <input
            type="text"
            placeholder="Search by job title or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handles Enter key press
            className="w-full p-3 md:p-4 text-white bg-transparent outline-none border-none placeholder-gray-300 text-sm md:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-yellow-400 text-purple-900 px-6 py-3 md:px-8 md:py-4 rounded-full ml-2 md:ml-3"
          >
            <Search className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
