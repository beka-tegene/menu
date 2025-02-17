"use client";

import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { FolderOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const Sidebar = ({ className }: { className?: string }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "Menu 1") {
      setOpenSubmenu(!openSubmenu);
    } else {
      setOpenSubmenu(false);
    }
  };

  return (
    <aside
      className={`m-2 rounded-lg fixed bottom-0 left-0 top-0 right-0 z-50 w-[250px] border-r-2 border-gray-100 bg-[#101828] text-white transition-all duration-500 ease-out ${className}`}
    >
      {/* Sidebar Header */}
      <div className="sticky top-0 z-40 flex justify-center px-6 py-5 font-semibold text-lg">
        Sidebar
      </div>

      <SimpleBar className="relative h-[calc(100%-80px)] pb-10">
        <nav className="mt-4 mx-4">
          {/* Menu Item 1 - With Submenu */}
          <div
            className={`flex items-center px-4 py-2 cursor-pointer rounded-lg transition-all ${
              activeMenu === "Menu 1" ? "bg-gray-600 text-yellow-300" : "hover:bg-gray-700"
            }`}
            onClick={() => handleMenuClick("Menu 1")}
          >
            {openSubmenu ? (
              <FolderOpenOutlined className="mr-5 text-yellow-300" />
            ) : (
              <FolderOutlined className="mr-5" />
            )}
            <span>Menu 1</span>
          </div>
          {/* Submenu */}
          {openSubmenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-8 border-l border-gray-600"
            >
              {["Submenu 1", "Submenu 2", "Submenu 3", "Submenu 4"].map(
                (submenu) => (
                  <div
                    key={submenu}
                    className={`px-4 py-2 cursor-pointer rounded-lg transition-all ${
                      activeMenu === submenu ? "bg-gray-600 text-yellow-300" : "hover:bg-gray-700"
                    }`}
                    onClick={() => handleMenuClick(submenu)}
                  >
                    {submenu}
                  </div>
                )
              )}
            </motion.div>
          )}

          {/* Other Menu Items */}
          {["Menu 2", "Menu 3", "Menu 4"].map((menu) => (
            <div
              key={menu}
              className={`flex items-center px-4 py-2 cursor-pointer rounded-lg transition-all ${
                activeMenu === menu ? "bg-gray-600 text-yellow-300" : "hover:bg-gray-700"
              }`}
              onClick={() => handleMenuClick(menu)}
            >
              <FolderOutlined className="mr-5" />
              <span>{menu}</span>
            </div>
          ))}
        </nav>
      </SimpleBar>
    </aside>
  );
};

export default Sidebar;
