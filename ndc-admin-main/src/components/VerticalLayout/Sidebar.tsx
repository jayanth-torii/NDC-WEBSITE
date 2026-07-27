import { SidebarContent } from "./SidebarContent";

export function Sidebar() {
  return (
    <div className="vertical-menu">
      <div className="h-100" style={{ overflowY: "auto" }}>
        <SidebarContent />
      </div>
    </div>
  );
}
