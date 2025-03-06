import { ExternalLink } from "lucide-react";
import "./api-key-button.style.css";

interface ApiKeyButtonAtomProps {
  apiKey: string;
}

const ApiKeyButtonAtom = ({ apiKey }: ApiKeyButtonAtomProps) => {
  // La URL de VSCode que incluye el apiKey como parámetro
  const handleOpenVSCode = () => {
    // URL para abrir VSCode con el apiKey como parámetro
    const vscodeUrl = `vscode://extension/ms-vscode-remote.remote-containers?apiKey=${apiKey}`;
    window.open(vscodeUrl, "_self");
  };

  return (
    <button
      className="api-key-button"
      onClick={handleOpenVSCode}
      title="Abrir en VSCode"
    >
      <ExternalLink className="api-key-button-icon" />
      <span>Abrir en VSCode</span>
    </button>
  );
};

export default ApiKeyButtonAtom;
