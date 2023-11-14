import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components";

export const Home = () => {
  return (
    <div className="flex gap-2 w-full h-[97vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
};
