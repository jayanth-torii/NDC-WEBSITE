import { Link } from "react-router-dom";
import { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useAuth } from "../../auth/AuthContext";

// Mirrors NCET admin's Header.js: brand box + burger toggle + heading +
// profile dropdown. Sidebar-collapse toggling uses a body class instead of
// Redux (state management intentionally kept local, per confirmed scope).
export function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleSidebar() {
    document.body.classList.toggle("sidebar-collapsed");
  }

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex align-items-center">
          <div className="navbar-brand-box">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: "var(--ndc-navy)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                NDC
              </span>
            </Link>
          </div>
          <button type="button" onClick={toggleSidebar} className="vertical-menu-btn" aria-label="Toggle sidebar">
            &#9776;
          </button>
          <div className="d-none d-sm-flex align-items-center ms-2">
            <h4 className="mb-0" style={{ fontWeight: 600, fontSize: 18, color: "var(--ndc-navy)", letterSpacing: "0.3px" }}>
              NDC Administration Panel
            </h4>
          </div>
        </div>
        <div className="d-flex align-items-center pe-3">
          <Dropdown isOpen={menuOpen} toggle={() => setMenuOpen((o) => !o)}>
            <DropdownToggle tag="button" className="btn btn-light d-flex align-items-center gap-2">
              <span>{user?.name}</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={logout}>Log out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
