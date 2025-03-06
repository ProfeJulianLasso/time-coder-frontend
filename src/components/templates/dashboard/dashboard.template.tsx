import { DashboardActionsOrganism } from "../../organisms/dashboard-actions";
import DashboardHeaderOrganism from "../../organisms/dashboard-header/dashboard-header.organism";
import "./dashboard.style.css";

const DashboardTemplate = () => {
  return (
    <div className="dashboard-layout">
      <DashboardHeaderOrganism />

      <main className="dashboard-main-content">
        <DashboardActionsOrganism />

        {/* Aquí se pueden agregar más secciones en el futuro */}
      </main>

      <footer className="dashboard-footer">
        <p>
          © {new Date().getFullYear()} TimeCoder. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default DashboardTemplate;
