import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData,setUserData]=useState("");



  const submitHandler = (submit) => {
    submit.preventDefault();
    setUserData(
      {
        email:email,
        password:password
      }
    )
    setEmail("");
    setPassword("");
  };





  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-14 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(submit) => {
            submitHandler(submit);
          }}
        >
          <h3 className="text-xl mt-4 mb-2 font-medium">what's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={email}
            onChange={(ele) => {
              setEmail(ele.target.value);
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={password}
            onChange={(ele) => {
              setPassword(ele.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/users/register" className="text-blue-500">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to='/captain/login' className="bg-[#10b461] flex justify-center font-semibold text-white mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-sm">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
}


export default UserLogin;
