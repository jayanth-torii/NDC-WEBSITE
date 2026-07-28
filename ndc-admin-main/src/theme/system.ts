import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Updated to match NDC frontend brand colors as requested.
// Sidebar and Footer will now use the NDC brand navy instead of NCET's dark gray.
//   - Orange accent #F6872A / box-shadow / border-radius / Poppins font are
//     all taken directly from _variables.scss and _root.scss.
const config = defineConfig({
  globalCss: {
    body: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.8125rem",
      color: "#1f2431",
      bg: "#f6f7fb",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          navy: { value: "#0e2455" },
          navyDeep: { value: "#0a1a3f" },
          orange: { value: "#F6872A" },
          orangeHover: { value: "#d9701a" },
          sidebarDark: { value: "#0e2455" },
          sidebarActiveBg: { value: "#0a1a3f" },
          footerDark: { value: "#0e2455" },
        },
      },
      fonts: {
        heading: { value: "'Poppins', sans-serif" },
        body: { value: "'Poppins', sans-serif" },
      },
      radii: {
        sm: { value: "8px" },
        md: { value: "10px" },
        lg: { value: "12px" },
      },
      shadows: {
        topbar: { value: "0 -3px 31px 0 rgba(0,0,0,0.05), 0 6px 20px 0 rgba(0,0,0,0.02)" },
        card: { value: "0 1px 2px rgba(14,36,85,0.04), 0 8px 24px rgba(14,36,85,0.06)" },
      },
    },
    semanticTokens: {
      colors: {
        "brand.solid": { value: "{colors.brand.orange}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
