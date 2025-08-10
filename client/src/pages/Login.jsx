import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [selectedRole, setSelectedRole] = useState("player"); // Default: 'player'
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div
        className={`w-[30%] bg-gray-800 p-6 ${
          state === "Login" ? "h-[50vh]" : "h-[65vh]"
        }`}
      >
        <h1 className="text-center text-2xl">{state}</h1>
        <form>
          {state === "SignUp" && (
            <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
              <User />
              <input
                type="text"
                placeholder="Enter your name"
                className="outline-none"
              />
            </div>
          )}
          <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
            <Mail />
            <input
              type="text"
              placeholder="Enter your email"
              className="outline-none"
            />
          </div>
          <div className="flex border border-gray-400 rounded-2xl w-full p-2 gap-2 mt-4">
            <Lock />
            <input
              type="text"
              placeholder="Enter your password"
              className="outline-none"
            />
          </div>
          {state === "Login" && (
            <p className="!text-blue-400 w-full text-right mt-2">
              Forgot Password?
            </p>
          )}
          {state === "SignUp" && (
            <div className="my-4">
              <p>Sign Up as</p>
              <div className="flex gap-2 mt-2">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="player"
                    name="role"
                    value="player"
                    checked={selectedRole === "player"}
                    onChange={() => setSelectedRole("player")}
                  />
                  <label htmlFor="player">Player</label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="organizer"
                    name="role"
                    value="organizer"
                    checked={selectedRole === "organizer"}
                    onChange={() => setSelectedRole("organizer")}
                  />
                  <label htmlFor="organizer">Organizer</label>
                </div>
              </div>
            </div>
          )}
          <button className="bg-amber-500 w-full p-2 rounded-2xl mt-4">
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
              Dont have an account?
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
