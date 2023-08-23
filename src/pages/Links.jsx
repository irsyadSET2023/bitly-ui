import React, { useContext, useEffect, useState } from "react";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../App";
import { deleteLink, editLink, getAllLinks } from "../utils/api";
import Modal, { ModalAddLink } from "../components/Modal";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadingToast = () => toast("Loading.....");
const successToast = () => toast.success("Success.....");
const errorToast = () => toast.error("Success.....");
const BASE_URL = import.meta.env.VITE_API_URL;

const Links = () => {
  const { jwtCookie } = useContext(AuthContext);
  const [fetchDataState, setFetchDataState] = useState("pending");
  const [dataState, setDataState] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [editState, setEditState] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const fetchLinks = async () => {
    try {
      setFetchDataState("loading");
      const data = await getAllLinks(jwtCookie);
      console.log(data?.data?.data);
      const realData = data?.data?.data;
      setDataState(realData);
      console.log("Data:", dataState);
      setFetchDataState("success");
    } catch (error) {
      console.log(error);
      setFetchDataState("Error");
    }
  };

  const copyLink = () => {};

  const addNewLink = () => {
    setModalState(true);
  };

  const onSubmit = () => {};

  const handleDelete = async (slug) => {
    try {
      setFetchDataState("loading");
      console.log({ slug });
      console.log(jwtCookie);
      const res = await deleteLink(jwtCookie, { slug: slug });
      console.log(res);
      window.location.reload(false);
      setFetchDataState("success");
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

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
                <th className="border">No.</th>
                <th className="border">Destination</th>
                <th className="border">Link</th>
                <th className="border">Visit count</th>
                <th className="border">Created at</th>
                <th className="border">Action</th>
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
                  />
                );
              })}
            </tbody>
          </table>
          <Modal showModal={modalState} setShow={setModalState}>
            <ModalAddLink
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              jwtCookie={jwtCookie}
              setShow={setModalState}
            />
          </Modal>
        </div>
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
          <button className="ml-2" onClick={copyLink}>
            📋
          </button>
        </span>
      </td>
      <td>{column.visit_counts}</td>
      <td>{new Date(column.created_at).toLocaleString()}</td>
      <td className="flex gap-2">
        <button onClick={() => handleDelete(column.slug)} className="border">
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
