import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { postRegisterUser } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadingToast = () => toast("Loading....");
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const [registerState, setRegisterState] = useState("pending");
  const onSubmit = async (data) => {
    setRegisterState("loading");
    loadingToast();
    try {
      const newUser = await postRegisterUser({
        user_name: data.user_name,
        email: data.email,
        password: data.password,
      });
      setRegisterState("success");
      console.log(newUser);
    } catch (error) {
      console.log(error.response.data.err.errors);
      const serverErrors = error?.response?.data?.err?.errors || [];
      setRegisterState("error");
      serverErrors.map((serverError) =>
        setError(serverError.path, { message: serverError.msg })
      );
      setRegisterState("pending");
    }
  };
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-pink-800">
      <Logo />
      {(registerState === "pending" || registerState === "loading") && (
        <div className="bg-white min-w-[600px] p-2 space-y-2">
          Register
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label>Username</label>
            <input
              className="block border border-black w-[100%]"
              type="text"
              {...register("user_name", { required: true })}
            />
            {errors.user_name && (
              <div className="text-red-700">
                {errors.user_name.message || "This Field is Required"}
              </div>
            )}
            <label>Email</label>
            <input
              className="block border border-black w-[100%]"
              type="text"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="text-red-700">
                {errors.email.message || "This Field is Required"}
              </div>
            )}
            <label>Password</label>
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
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 text-center w-[100%] disabled:bg-gray-400"
                disabled={registerState === "loading"}
              >
                {registerState === "loading" ? "Registering...." : "Register"}
              </button>
            </div>

            <Link className="block text-center" to="/login">
              Log in as existing user
            </Link>
          </form>
        </div>
      )}

      {registerState == "success" && (
        <div>
          <h1 className="text-3xl">Thanks for Sign In</h1>
          <Link className="block text-center text-pink-500" to="/login">
            Log in
          </Link>
        </div>
      )}
      {registerState === "loading" && <ToastContainer />}
    </div>
  );
};

export default Register;
