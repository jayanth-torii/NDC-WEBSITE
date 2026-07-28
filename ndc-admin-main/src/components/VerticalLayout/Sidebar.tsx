import { Box } from "@chakra-ui/react";
import { SidebarContent } from "./SidebarContent";
import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH, useLayout } from "./LayoutContext";

// Mirrors NCET admin's Sidebar.js/.vertical-menu with data-sidebar="dark"
// (NCET's actual default theme — store/layout/reducer.js INIT_STATE —
// background #2b3a4a, not navy).
export function Sidebar() {
  const { collapsed } = useLayout();
  return (
    <Box
      as="nav"
      position="fixed"
      top={HEADER_HEIGHT}
      bottom={0}
      left={0}
      w={collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}
      bg="brand.sidebarDark"
      boxShadow="0 -3px 31px 0 rgba(0,0,0,0.05)"
      overflowY="auto"
      overflowX="hidden"
      zIndex={1001}
      display={{ base: "none", lg: "block" }}
      transition="width 0.2s ease"
    >
      <SidebarContent collapsed={collapsed} />
    </Box>
  );
}
