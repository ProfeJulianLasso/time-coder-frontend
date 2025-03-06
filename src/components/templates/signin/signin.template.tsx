import { SignInFormOrganism } from "../../organisms/signin-form";
import "./signin.style.css";

const SignInTemplate = () => {
  return (
    <div className="signin-layout">
      <div className="signin-logo-container">
        <img
          src="/logo.svg"
          alt="TimeCoder Logo"
          className="signin-logo"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/150?text=TimeCoder";
          }}
        />
      </div>

      <SignInFormOrganism />

      <div className="signin-footer">
        <p>
          © {new Date().getFullYear()} TimeCoder. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default SignInTemplate;
