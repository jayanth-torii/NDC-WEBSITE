import { createContext, useContext, useState, type ReactNode } from "react";

interface LayoutContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <LayoutContext.Provider value={{ collapsed, toggle: () => setCollapsed((c) => !c) }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}

export const HEADER_HEIGHT = "70px";
export const FOOTER_HEIGHT = "60px";
export const SIDEBAR_WIDTH = "240px";
export const SIDEBAR_COLLAPSED_WIDTH = "70px";
