import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../App";
import { addLink } from "../utils/api";
import QRCode from "react-qr-code";

const Modal = ({ showModal = false, setShow, children }) => {
  const handleModalClose = () => {
    console.log("Hai");
    console.log("set Show", setShow);
    setShow(false);
  };

  return (
    showModal && (
      <div
        onClick={handleModalClose}
        className="bg-red-700/80  top-0 left-0 w-screen h-screen flex justify-center items-center fixed z-50"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <div className="bg-white w-full md:w-[500px] p-4 rounded flex flex-col">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export const ModalQRCode = ({ value }) => {
  return (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={value}
      viewBox={`0 0 256 256`}
    />
  );
};

export const ModalAddLink = ({
  handleSubmit,
  onSubmit,
  register,
  jwtCookie,
  setShow,
}) => {
  onSubmit = async (data) => {
    try {
      console.log(data.link);
      console.log(jwtCookie);
      const res = await addLink(jwtCookie, { link: data.link });

      console.log(res);
      setShow(false);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <div>
      <h1>Insert Your New Link</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="link">Link</label>
        <input
          className="block border border-black w-[100%]"
          type="text"
          {...register("link", { required: true })}
        />
        <button className="bg-pink-500" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export const ModalHeader = ({ title, subtitle }) => {
  return (
    <div className="py-4 space-y-2">
      <h6 className="font-bold">{title}</h6>
      <p>{subtitle}</p>
    </div>
  );
};

export const ModalFooter = ({ children }) => {
  return <div className="space-y-2 flex flex-col ">{children}</div>;
};

// export const Modal

export default Modal;
