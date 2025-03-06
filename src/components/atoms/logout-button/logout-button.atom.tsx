import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../shared/stores";
import "./logout-button.style.css";

const LogoutButtonAtom = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
      title="Cerrar sesión"
    >
      <LogOut className="logout-button-icon" />
      <span>Cerrar sesión</span>
    </button>
  );
};

export default LogoutButtonAtom;
