import { useEffect } from "react";
import { DashboardTemplate } from "../../components/templates/dashboard";
import "./dashboard.style.css";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard | TimeCoder";
  }, []);

  return <DashboardTemplate />;
};

export default DashboardPage;
