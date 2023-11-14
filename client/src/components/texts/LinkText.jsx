import React from "react";
import { Link } from "react-router-dom";

export const LinkText = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="underline text-accent-tertiary hover:text-accent-tertiary-light"
    >
      {children}
    </Link>
  );
};
