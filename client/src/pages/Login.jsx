import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [role, setRole] = useState("player"); // Default role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
axios.defaults.withCredentials = true; // Send cookies with requests


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, password }
        );
        if (data.success) {
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/signup",
          { name, email, password, role }
        );
        if (data.success) {
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div
        className={`w-[30%] bg-gray-800 p-6 ${
          state === "Login" ? "h-[50vh]" : "h-[65vh]"
        }`}
      >
        <h1 className="text-center text-2xl">{state}</h1>
        <form onSubmit={onSubmitHandler}>
          {state === "SignUp" && (
            <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
              <User />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                className="outline-none bg-transparent"
                required
              />
            </div>
          )}
          <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
            <Mail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="outline-none bg-transparent"
              required
            />
          </div>
          <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
            <Lock />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="outline-none bg-transparent"
              required
            />
          </div>

          {state === "Login" && (
            <p className="text-blue-400 w-full text-right mt-2 cursor-pointer">
              Forgot Password?
            </p>
          )}

          {state === "SignUp" && (
            <div className="my-4">
              <p>Sign Up as</p>
              <div className="flex gap-4 mt-2">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="role"
                    value="player"
                    checked={role === "player"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Player
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={role === "organizer"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Organizer
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-amber-500 w-full p-2 rounded-2xl mt-4"
          >
            {state}
          </button>
        </form>
      </div>

      <div
        className={`w-[30%] bg-gray-700 flex items-center justify-center ${
          state === "Login" ? "h-[50vh]" : "h-[65vh]"
        }`}
      >
        {state === "Login" ? (
          <div>
            <h1 className="text-2xl font-bold text-center">
              Don’t have an account?
            </h1>
            <button
              onClick={() => setState("SignUp")}
              className="bg-amber-400 p-2 w-full rounded-xl mt-4"
            >
              Create an account here
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center">
              Already have an account?
            </h1>
            <button
              onClick={() => setState("Login")}
              className="bg-amber-400 p-2 w-full rounded-xl mt-4"
            >
              Login here
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
