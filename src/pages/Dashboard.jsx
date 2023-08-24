import React from "react";
import Header from "../components/Header";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";
import useGetAllLinks from "../utils/hooks/useGetAllLinks";
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

  const labels = dataState.map((element) => element.slug);
  const visitCount = dataState.map((element) =>
    Math.round(element.visit_counts)
  );
  console.log(visitCount);
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

  return (
    <DashboardLayout>
      <div>Dashboard</div>
      <button onClick={fetchLinks}>Fetch</button>
      <Bar options={options} data={data} />
    </DashboardLayout>
  );
};

export default Dashboard;
