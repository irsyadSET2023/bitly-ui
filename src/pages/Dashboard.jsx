import React from "react";
import Header from "../components/Header";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>Dashboard</div>
    </DashboardLayout>
  );
};

export default Dashboard;
