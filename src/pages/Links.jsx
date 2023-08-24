import React, { useContext, useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import { deleteLink, editLink, getAllLinks } from "../utils/api";
import Modal, { ModalAddLink, ModalQRCode } from "../components/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";

const loadingToast = () => toast("Loading.....");
const successToast = (successText) => toast.success(successText);
const errorToast = (errorText) => toast.error(errorText);
const BASE_URL = import.meta.env.VITE_API_URL;

const Links = () => {
  const { setFetchDataState, dataState, jwtCookie } = useGetAllLinks();
  const [modalState, setModalState] = useState(false);
  const [modalSetup, setModalSetup] = useState("qr");
  const [editState, setEditState] = useState(false);
  const [qrCodeval, setQrCodeVal] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const copyLink = (link) => {
    const textarea = document.createElement("textarea");
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // You can also provide a visual indication to the user that the link was copied
    successToast("Link is copied to clipboard");
  };

  const addNewLink = () => {
    setModalState(true);
    setModalSetup("newlink");
  };

  const onSubmit = () => {};

  const showQR = (slugLink) => {
    setModalState(true);
    setQrCodeVal(slugLink);
    setModalSetup("qr");
  };

  const handleDelete = async (slug) => {
    try {
      setFetchDataState("loading");
      console.log({ slug });
      console.log(jwtCookie);
      const res = await deleteLink(jwtCookie, { slug: slug });
      console.log(res);
      successToast(`Link ${slug} is deleted`);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
      setFetchDataState("success");
    } catch (error) {
      console.log(error);
      errorToast("Something wrong", error);
    }
  };

  const handleEdit = (divId, buttonId) => {
    setEditState(true);
    const divElement = document.getElementById(divId);
    console.log(divElement.className);
    divElement.classList.add("border-red-700");
    console.log(divElement.classList);
    const buttonElement = document.getElementById(buttonId);
    buttonElement.textContent = "✅";
    divElement.contentEditable = true;
  };

  const checkEdit = async (divId, buttonId) => {
    setEditState(false);
    const divElement = document.getElementById(divId);

    const buttonElement = document.getElementById(buttonId);
    const text = document.getElementById(divId).textContent;
    console.log("Check Edit", text);
    try {
      const res = await editLink(jwtCookie, { slug: divId, link: text });
      console.log(res);
      divElement.contentEditable = false;
      buttonElement.textContent = "🖊️";
      divElement.classList.remove("border-red-700");
      divElement.classList.add("bg-white");
      successToast("Link is Updated");
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.err.errors[0].msg);
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="p-4">
          <div className="h-[40px] flex justify-between items-center mb-8">
            <h4 className="text-2xl font-semibold text-pink-500">Links</h4>
            <button
              onClick={addNewLink}
              className="bg-pink-500 p-2 rounded text-white"
            >
              + New link
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Destination</th>
                <th>Link</th>
                <th>QR Code</th>
                <th>Visit count</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataState.map((column, index) => {
                return (
                  <Row
                    column={column}
                    index={index}
                    editState={editState}
                    copyLink={copyLink}
                    handleEdit={handleEdit}
                    checkEdit={checkEdit}
                    handleDelete={handleDelete}
                    showQR={showQR}
                  />
                );
              })}
            </tbody>
          </table>
          <Modal showModal={modalState} setShow={setModalState}>
            {modalSetup === "newlink" && (
              <ModalAddLink
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                jwtCookie={jwtCookie}
                setShow={setModalState}
              />
            )}
            {modalSetup === "qr" && <ModalQRCode value={qrCodeval} />}
          </Modal>
        </div>
        <ToastContainer />
      </DashboardLayout>
    </>
  );
};

const Row = ({
  column,
  index,
  editState,
  editButtonState,
  copyLink,
  handleEdit,
  checkEdit,
  handleDelete,
  showQR,
}) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>

      <EditRegion
        index={index}
        column={column}
        editState={editState}
        editButtonState={editButtonState}
        handleEdit={handleEdit}
        checkEdit={checkEdit}
      />
      <td>
        {BASE_URL + "/" + column.slug}
        <span>
          <button
            className="ml-2"
            onClick={() => copyLink(BASE_URL + "/" + column.slug)}
          >
            📋
          </button>
        </span>
      </td>
      <td>
        <h1
          className="text-blue-500 text-center cursor-pointer"
          onClick={() => showQR(column.slug)}
        >
          View
        </h1>
      </td>
      <td>{column.visit_counts}</td>
      <td>{new Date(column.created_at).toLocaleString()}</td>
      <td className="flex gap-2 text-center">
        <button
          onClick={() => handleDelete(column.slug)}
          className="text-center"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

const EditRegion = ({ index, column, editState, handleEdit, checkEdit }) => {
  return (
    <td key={index} className="flex justify-between">
      <h1 className="border" id={column.slug}>
        {column.link}
      </h1>

      <button
        id={`edit${column.slug}`}
        onClick={
          !editState
            ? () => handleEdit(column.slug, `edit${column.slug}`)
            : () => checkEdit(column.slug, `edit${column.slug}`)
        }
        className="border"
      >
        🖊️
      </button>
    </td>
  );
};

export default Links;
