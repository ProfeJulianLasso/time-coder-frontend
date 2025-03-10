import { ApiKeyButtonAtom } from "../../atoms/api-key-button";
import "./dashboard-actions.style.css";

const DashboardActionsOrganism = () => {
  return (
    <section className="dashboard-actions-section">
      <div className="dashboard-actions-container">
        <h3 className="dashboard-actions-title">Acciones disponibles</h3>
        <p className="dashboard-actions-description">
          Utiliza las siguientes opciones para gestionar tu entorno de
          desarrollo.
        </p>

        <div className="dashboard-actions-buttons">
          <ApiKeyButtonAtom />
        </div>
      </div>
    </section>
  );
};

export default DashboardActionsOrganism;
