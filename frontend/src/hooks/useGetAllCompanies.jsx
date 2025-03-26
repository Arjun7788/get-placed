import { setAllJobs } from "@/redux/jobSlice";
import { setCompanies } from "@/redux/companySlice";
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetData = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    // Function to fetch jobs
    const fetchAllJobs = async () => {
      try {
        console.log("Fetching jobs for:", searchedQuery);

        const token = localStorage.getItem("token"); // Get token from local storage

        const res = await axios.get(
          `${JOB_API_END_POINT}/get?tech_stack=${searchedQuery}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Function to fetch companies
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        console.log("Fetching companies...");
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchAllJobs();
    fetchCompanies();
  }, [searchedQuery]); // Runs when searchedQuery changes
};

export default useGetData;
