import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { HEADER_HEIGHT, LayoutProvider, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH, useLayout } from "./LayoutContext";

// Mirrors NCET admin's VerticalLayout/index.js structure (Header + Sidebar +
// .main-content > .page-content + Footer), rebuilt with Chakra components
// and local collapse state (LayoutContext) instead of NCET's Redux layer.
function LayoutBody() {
  const { collapsed } = useLayout();
  const marginLeft = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box minH="100vh">
      <Header />
      <Sidebar />
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        ml={{ base: 0, lg: marginLeft }}
        transition="margin-left 0.2s ease"
      >
        <Box flex="1" pt={`calc(${HEADER_HEIGHT} + 20px)`} pb="30px" px={5}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export function VerticalLayout() {
  return (
    <LayoutProvider>
      <LayoutBody />
    </LayoutProvider>
  );
}
