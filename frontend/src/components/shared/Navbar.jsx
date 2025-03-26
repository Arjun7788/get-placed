import React, { useState } from "react";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  let navbarTitle = "GetPlaced";
  if (user?.role === "student") navbarTitle = "MSUPortal";
  else if (user?.role === "recruiter") navbarTitle = "MSUAdmin";

  const navItems =
    user?.role === "recruiter"
      ? [
          { to: "/admin/companies", label: "Companies" },
          { to: "/admin/jobs", label: "Internships" },
        ]
      : [
          { to: "/", label: "Home" },
          { to: "/jobs", label: "Internships" },
          { to: "/browse", label: "Browse" },
          { to: "/InterviewMaterials", label: "Materials" },
          { to: "/Committee", label: "Committee" },
        ];

  return (
    <motion.div className="w-full z-50 bg-gradient-to-r from-[#6A38C2] to-[#5B30A6] shadow-lg h-16">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Left Side: Menu Icon + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Icon - Positioned Left of the Logo */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white text-3xl focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <motion.h1 className="text-3xl font-bold tracking-wide cursor-pointer">
              <span className="text-white">
                {navbarTitle.startsWith("MSU") ? "MSU" : "Get"}
              </span>
              <span className="text-[#FFD700]">
                {navbarTitle.startsWith("MSU")
                  ? navbarTitle.substring(3)
                  : "Placed"}
              </span>
            </motion.h1>
          </Link>
        </div>

        {/* Navigation Items (Desktop) */}
        <ul className="lg:flex font-medium items-center gap-6 text-lg hidden">
          {navItems.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <Link
                to={to}
                className={`transition duration-200 ${
                  location.pathname === to
                    ? "text-[#FFD700]"
                    : "text-white hover:text-[#FFD700]"
                }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#6A38C2] lg:hidden flex flex-col items-center py-4 space-y-4 shadow-md transition-all duration-300 z-50">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-white text-lg hover:text-[#FFD700]"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Show Login and Signup when user is not logged in */}
            {!user && (
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="bg-[#FFD700] text-[#6A38C2] font-semibold hover:bg-[#E6C200] hover:scale-105 transition duration-200 w-32">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="bg-[#FFD700] text-[#6A38C2] font-semibold hover:bg-[#E6C200] hover:scale-105 transition duration-200 w-32">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* User Profile / Login Buttons */}
        {!user ? (
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button className="bg-[#FFD700] text-[#6A38C2] font-semibold hover:bg-[#E6C200] hover:scale-105 transition duration-200">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#FFD700] text-[#6A38C2] font-semibold hover:bg-[#E6C200] hover:scale-105 transition duration-200">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Avatar className="cursor-pointer border-2 border-white">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#6A38C2] text-white shadow-xl border border-gray-300 rounded-lg">
              <div className="p-3 border-b border-gray-400 flex items-center gap-3">
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium text-white text-lg">
                    {user?.fullname}
                  </h4>
                  <p className="text-sm text-gray-300">{user?.profile?.bio}</p>
                </div>
              </div>

              <div className="flex flex-col my-2 text-gray-200">
                {user?.role === "student" && (
                  <div className="flex items-center gap-2 p-2 rounded cursor-pointer w-full hover:bg-[#5B30A6]">
                    <User2 />
                    <Button variant="link" className="text-white">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 p-2 rounded cursor-pointer w-full hover:bg-[#5B30A6]">
                  <LogOut />
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-white"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
