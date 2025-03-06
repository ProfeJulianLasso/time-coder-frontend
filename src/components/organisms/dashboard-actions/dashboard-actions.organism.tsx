import { ApiKeyButtonAtom } from "../../atoms/api-key-button";
import "./dashboard-actions.style.css";

// API Key proporcionada en los requisitos
const API_KEY =
  "2bc5d6d85ebd1cf05afe9ac464046af3bbfbc382441eea04a5aa94e3578ede22";

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
          <ApiKeyButtonAtom apiKey={API_KEY} />
        </div>
      </div>
    </section>
  );
};

export default DashboardActionsOrganism;
