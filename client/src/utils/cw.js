import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cw = (...className) => {
  return twMerge(clsx(className));
};
