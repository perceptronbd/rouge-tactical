import React from "react";
import { cw } from "../../utils";

export const Text = ({ variant, type, children, className }) => {
  // Define a mapping of variants to HTML elements
  const variantsElement = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    sub: "sub",
  };

  const variantsStyle = {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
    body: "text-base",
    sub: "text-sm",
  };

  // Define a mapping of styles to CSS classes
  const stylesMap = {
    bold: "font-semibold",
    normal: "font-normal",
    thin: "font-thin",
  };

  // Determine the HTML element and style based on the variant prop
  const Element = variantsElement[variant] || "p";
  const textStyle = stylesMap[type] || "font-normal";
  const style = variantsStyle[variant] || "text-base";

  return (
    <Element className={cw(` ${textStyle} ${style}`, className)}>
      {children}
    </Element>
  );
};
