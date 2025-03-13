import { ExternalLink } from "lucide-react";
import { useAuthStore } from "../../../stores";
import "./api-key-button.style.css";

const ApiKeyButtonAtom = () => {
  const { user } = useAuthStore();
  const apiKey = user?.apiKey ?? "";

  // La URL de VSCode que incluye el apiKey como parámetro
  const handleOpenVSCode = () => {
    // URL para abrir VSCode con el apiKey como parámetro
    const vscodeUrl = `vscode://Sofka.timecoder?apiKey=${apiKey}`;
    window.open(vscodeUrl, "_self");
  };

  return (
    <button
      className="api-key-button"
      onClick={handleOpenVSCode}
      title="Abrir en VSCode"
      disabled={!apiKey}
    >
      <ExternalLink className="api-key-button-icon" />
      <span>Abrir en VSCode</span>
    </button>
  );
};

export default ApiKeyButtonAtom;
