"use client";
import React from "react";
import Sidebar from "./sidebar";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-grow bg-white dark:bg-black">
      {/* Sidebar for larger screens */}
      <Sidebar className="fixed hidden xl:block dark:bg-gray-50" />

      {/* Main Content Area */}
      <div className="flex w-full flex-col transition-all duration-500 ease-out xl:ms-[256px] xl:w-[calc(100%-256px)] 2xl:ms-64 2xl:w-[calc(100%-256px)]">
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
};

export default LayoutPage;
