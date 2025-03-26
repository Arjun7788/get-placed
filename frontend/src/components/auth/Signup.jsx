import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    prn: "",
    password: "",
    role: "",
    file: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const validate = () => {
    let newErrors = {};
    if (!input.fullname) newErrors.fullname = "Full Name is required";
    if (!input.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
      newErrors.email = "Invalid email format";
    if (!input.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(input.phoneNumber))
      newErrors.phoneNumber = "Phone Number must be 10 digits";
    if (!input.prn) newErrors.prn = "PRN is required";
    if (!input.password) newErrors.password = "Password is required";
    else if (input.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!input.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("prn", input.prn);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto p-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>
          {[
            {
              label: "Full Name",
              name: "fullname",
              type: "text",
              placeholder: "Varun Chavda",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "varunchavda2003@gmail.com",
            },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "text",
              placeholder: "8849076829",
            },
            {
              label: "PRN Number",
              name: "prn",
              type: "text",
              placeholder: "8022030523",
            },
          ].map((field) => (
            <div key={field.name} className="my-2">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                value={input[field.name]}
                name={field.name}
                onChange={changeEventHandler}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <Label>Choose Role</Label>
          <RadioGroup className="flex items-center gap-4 my-5">
            {["student"].map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value={role}
                  checked={input.role === role}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>{role.charAt(0).toUpperCase() + role.slice(1)}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
