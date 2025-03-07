import { useAuthStore } from "../../../stores";
import { LogoutButtonAtom } from "../../atoms/logout-button";
import "./dashboard-header.style.css";

const DashboardHeaderOrganism = () => {
  const { user } = useAuthStore();

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="dashboard-user-info">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              className="dashboard-user-avatar"
            />
          )}
          <div>
            <h2 className="dashboard-user-name">{user?.name}</h2>
            <p className="dashboard-user-email">{user?.email}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <LogoutButtonAtom />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeaderOrganism;
