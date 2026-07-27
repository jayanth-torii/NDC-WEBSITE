import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

// Mirrors NCET admin's VerticalLayout/index.js structure (#layout-wrapper >
// Header + Sidebar + .main-content > .page-content + Footer). Redux-driven
// theme/layout-width toggles are intentionally not ported (confirmed scope):
// this is the same visual chrome without that state-management layer.
export function VerticalLayout() {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
