import LayoutPage from "@/features/Layout/layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutPage>{children}</LayoutPage>;
};

export default Layout;
