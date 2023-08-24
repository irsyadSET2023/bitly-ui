import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const loadingToast = () => toast("Fetching Data....");
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scale: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Visit Counts by Links",
    },
  },
};

const Dashboard = () => {
  const { fetchDataState, dataState, jwtCookie, fetchLinks } = useGetAllLinks();
  const [buttonState, setButtonState] = useState("pending");

  const labels = dataState.map((element) => element.slug);
  const visitCount = dataState.map((element) => element.visit_counts);
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: visitCount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const fetchData = () => {
    loadingToast();
    setTimeout(() => {
      fetchLinks();
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="bg-pink-100 h-screen flex flex-col justify-between flex-grow">
        <h1 className="text-5xl text-pink-400 text-bold text-center">
          Dashboard
        </h1>
        <button
          className="flex justify-center text-2xl text-pink-400 text-bold text-center"
          onClick={fetchData}
        >
          <div className="bg-pink-800 w-[300px]"> Fetch</div>
        </button>
        <Bar className="" options={options} data={data} />
      </div>
      <ToastContainer />
    </DashboardLayout>
  );
};

export default Dashboard;
