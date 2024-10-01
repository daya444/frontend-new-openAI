import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: name, 
      email: email,
      password: password,
    };
    
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name,email, password); // Assuming auth has a signup method
      toast.success("Signed Up Successfully", { id: "signup" });
      navigate("/chat"); // Redirect after signup
    } catch (error) {
      console.error("Error Response:", error.response?.data); // Log the detailed error message from the server
      toast.error("Signing Up Failed: " + error.response?.data.message || "An error occurred", { id: "signup" });
    }
    
    setName(""); 
    setEmail(""); 
    setPassword(""); 

    
  };
  


  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="airobot.png" alt="AI Robot" className="w-400 h-auto" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-2/3">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
