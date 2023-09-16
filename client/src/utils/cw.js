import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cw = (...classes) => {
  return twMerge(clsx(classes));
};
