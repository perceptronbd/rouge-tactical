import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { navLinks } from "./navLinks";
import { Text } from "../texts/Text";
import { NavLink } from "react-router-dom";
import { Button } from "../buttons/Button";
import { useAuth } from "../../contexts/AuthContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export const Sidebar = () => {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    logout();
  };

  return (
    <section className="bg-foreground h-[98vh] rounded">
      <div className="relative bg-red-500 flex justify-end">
        <BsFillArrowLeftCircleFill
          className={`absolute -right-3 ${
            open ? "top-12" : "top-7"
          } w-7 h-7 cursor-pointer  text-accent-secondary border-foreground bg-foreground
     border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={`${
          open ? "w-64" : "w-20"
        } h-full flex flex-col justify-between transition-all translate duration-300`}
      >
        {open ? (
          <section className="flex flex-col p-2 gap-x-4 items-center">
            <img
              src="/assets/logo.svg"
              alt="Rouge Tactical"
              className="w-60 rounded"
            />
            <Text className={"text-textColor-light"}>
              6861 Nancy Ridge Dr, Suite B
            </Text>
            <Text className={"text-textColor-light"}>San Diego, CA, 92121</Text>
          </section>
        ) : (
          <section className="flex flex-col p-2 gap-x-4 items-center">
            <img
              src="/assets/logo-sm.svg"
              alt="Rouge Tactical"
              className="w-60 rounded"
            />
          </section>
        )}
        <ul className="h-[400px] 3xl:h-[650px]">
          {navLinks.map((link, index) => {
            return open ? (
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "flex m-2 text-accent-primary bg-accent-secondary hover:bg-opacity-80 rounded-md px-2 py-1.5 cursor-pointer items-center transition-all duration-200 "
                    : "flex m-2 font-semibold text-lg text-textColor hover:bg-accent-primary hover:text-accent-secondary rounded-md px-2 py-1 cursor-pointer items-center transition-all duration-200"
                }
                to={link.path}
                key={index}
                title={link.title}
              >
                <li className={`flex gap-x-4 items-center w-full px-6`}>
                  <link.Icon size={"1.5rem"} />

                  <Text variant="h5" type="bold">
                    {link.title}
                  </Text>
                </li>
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "flex m-2 text-accent-primary bg-accent-secondary hover:bg-opacity-80 rounded-md px-2 py-1.5 cursor-pointer items-center transition-all duration-200 "
                    : "flex m-2 font-semibold text-lg text-textColor hover:bg-accent-primary hover:text-accent-secondary rounded-md px-2 py-1 cursor-pointer items-center transition-all duration-200"
                }
                to={link.path}
                key={index}
                title={link.title}
              >
                <li className={`mx-auto`}>
                  <link.Icon size={"1.5rem"} />
                </li>
              </NavLink>
            );
          })}
        </ul>
        <Button
          className={"m-2 w-auto"}
          variant={"ghost"}
          icon={FiLogOut}
          onClick={handleLogout}
        >
          {open && `Log Out`}
        </Button>
      </div>
    </section>
  );
};
