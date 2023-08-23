import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLoginUser } from "../utils/api";
import { AuthContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadingToast = () => toast("Logging In....");
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => console.log(data);
  const [loginState, setLoginState] = useState("pending");
  const { jwtCookie, setJwtCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (jwtCookie) {
      navigate("/dashboard");
    }
  }, [jwtCookie]);

  const onSubmit = async (data) => {
    console.log(data);
    setLoginState("loading");
    loadingToast();
    try {
      const userLogin = await postLoginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setLoginState("success");
      console.log(userLogin.jwt);
      setJwtCookie(userLogin.jwt);
    } catch (error) {
      setLoginState("error");
      setError("identifier", { message: "Invalid Credential" });
      setError("password", { message: "Invalid Credential" });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-pink-800">
      <div className="bg-white min-w-[600px] p-2 flex flex-col gap-3">
        Login
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <label htmlFor="">Username or Email</label>
          <input
            className="block border border-black w-[100%]"
            type="text"
            {...register("identifier", { required: true })}
          />
          {errors.identifier && (
            <div className="text-red-700">
              {errors.identifier.message || "This Field is Required"}
            </div>
          )}
          <label htmlFor="">Password</label>
          <input
            className="block border border-black w-[100%]"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <div className="text-red-700">
              {errors.password.message || "This Field is Required"}
            </div>
          )}

          <button type="submit" className="bg-pink-500 w-[100%]">
            Log in
          </button>

          <Link className="block text-center" to="/register">
            Register as new user
          </Link>
        </form>
      </div>
      {loginState === "loading" && <ToastContainer />}
    </div>
  );
};

export default Login;
