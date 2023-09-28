import React from "react";
import { cw } from "../../utils";

export const Text = ({ variant, type, children, className }) => {
  // Define a mapping of variants to HTML elements
  const variantsMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    sub: "sub",
  };

  // Define a mapping of styles to CSS classes
  const stylesMap = {
    bold: "font-bold",
    normal: "font-normal",
    thin: "font-thin",
  };

  // Determine the HTML element and style based on the variant prop
  const Element = variantsMap[variant] || "p";
  const textStyle = stylesMap[type] || "font-normal";

  return (
    <Element className={cw(` ${textStyle}`, className)}>{children}</Element>
  );
};
