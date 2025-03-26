import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = user?.profile?.resume ? true : false;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Stretched Full Width */}
      <Navbar className="w-full" />

      {/* Profile Container with Mobile Padding */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Animated Heading */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 mt-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Profile
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Manage your account details and applied jobs.
        </motion.p>

        {/* Profile Section */}
        <motion.div
          className="bg-white border border-gray-300 rounded-2xl px-6 py-6 shadow-md mt-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Edit Button on Top Right */}
          <Button
            onClick={() => setOpen(true)}
            className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition shadow-sm"
          >
            <Pen className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-900">
                {user?.fullname || "N/A"}
              </h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <div className="my-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="text-gray-500" />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="text-gray-500" />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>

          <div className="my-6">
            <h1 className="text-gray-800 font-semibold">Skills</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900 hover:shadow-md"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <Label className="text-gray-800 font-semibold">Resume</Label>
            {isResume ? (
              <div className="mt-1">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </a>
              </div>
            ) : (
              <span className="text-gray-500 mt-1 block">N/A</span>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div
          className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md mt-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-bold text-lg text-gray-800">Applied Jobs</h1>
          <AppliedJobTable />
        </motion.div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
