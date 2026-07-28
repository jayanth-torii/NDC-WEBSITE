import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Login.scss";
import ndcLogo from "../../assets/NDC-Logo.png";

// Mirrors NCET admin's pages/Authentication/Login.js structure (branding
// panel + glass card), simplified to single-step JWT login — the OTP step
// is skipped per the confirmed scope (single maintainer, no OTP-sending
// infra on this backend).
export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("admin-login-page");
    const fontId = "poppins-font";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
    return () => document.body.classList.remove("admin-login-page");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailInvalid(true);
      isValid = false;
    } else {
      setEmailInvalid(false);
    }
    if (password.trim() === "") {
      setPasswordInvalid(true);
      isValid = false;
    } else {
      setPasswordInvalid(false);
    }
    if (!isValid) return;

    setLoading(true);
    setLoginError("");
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setLoginError(err.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <main className="login-main-content">
        <section className="branding-section">
          <div className="logo-container" style={{background: 'transparent', padding: 0}}>
            <img src={ndcLogo} alt="NDC Logo" style={{ maxHeight: "80px", objectFit: "contain" }} />
          </div>
          <h1 className="main-heading">
            ADMIN
            <br />
            PORTAL
          </h1>
          <p className="subtitle-text">Manage the Nagarjuna Degree College website.</p>
          <p className="description-text">
            Access the dashboard to edit every page on the public site, manage the blog, and review enquiry
            submissions.
          </p>
        </section>

        <section className="login-section">
          <div className="glass-card">
            <form className="login-form" noValidate onSubmit={handleSubmit}>
              {loginError && (
                <div
                  style={{
                    color: "#f87171",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    marginBottom: "-10px",
                    background: "rgba(239, 68, 68, 0.1)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {loginError}
                </div>
              )}

              <div className={`input-group ${emailInvalid ? "invalid" : ""}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailInvalid(false);
                    setLoginError("");
                  }}
                />
                <span className="error-message">Please enter a valid email address</span>
              </div>

              <div className={`input-group ${passwordInvalid ? "invalid" : ""}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="**********"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordInvalid(false);
                    setLoginError("");
                  }}
                />
                <span className="error-message">Password is required</span>
              </div>

              <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                <span className="btn-text">SIGN IN</span>
                <span className="loader"></span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
