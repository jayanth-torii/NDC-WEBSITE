import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { VerticalLayout } from "./components/VerticalLayout";
import { Login } from "./pages/Authentication/Login";
import { DashboardPage } from "./pages/DashboardPage";
import { GenericSingletonPage } from "./pages/GenericSingletonPage";
import { SiteSettingsPage } from "./pages/SiteSettingsPage";
import { DepartmentEditorPage } from "./pages/DepartmentEditorPage";
import { ActivityCellsPage } from "./pages/ActivityCellsPage";
import { BlogsListPage } from "./pages/BlogsListPage";
import { BlogEditPage } from "./pages/BlogEditPage";
import { SubmissionsInboxPage } from "./pages/SubmissionsInboxPage";
import { ProfilePage } from "./pages/ProfilePage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutNdcPage } from "./pages/AboutNdcPage";
import { IicPage } from "./pages/IicPage";
import { IqacPage } from "./pages/IqacPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<VerticalLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/site-settings" element={<SiteSettingsPage />} />
              <Route path="/about-ndc" element={<AboutNdcPage />} />
              <Route path="/page/:title/:route" element={<GenericSingletonPage />} />
              <Route path="/department-details-editor" element={<DepartmentEditorPage />} />
              <Route path="/activity-cells" element={<ActivityCellsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/iic" element={<IicPage />} />
              <Route path="/iqac" element={<IqacPage />} />
              <Route path="/blogs" element={<BlogsListPage />} />
              <Route path="/blogs/:postId" element={<BlogEditPage />} />
              <Route path="/submissions/:kind" element={<SubmissionsInboxPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
