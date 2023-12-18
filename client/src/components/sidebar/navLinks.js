import {
  TbHome2,
  TbPackage,
  TbFileInvoice,
  TbLockAccess, TbSettings
} from "react-icons/tb";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2"
import {
  MdOutlinePayments,
  MdProductionQuantityLimits,
  MdOutlineSell,
} from "react-icons/md";

export const navLinks = [
  { title: "Home", path: "/employee", Icon: TbHome2 },
  { title: "Orders", path: "/orders", Icon: TbPackage },
  { title: "Invoice", path: "/invoice", Icon: TbFileInvoice },
  { title: "Purchase Orders", path: "/purchase", Icon: MdOutlineSell },
  { title: "Permits", path: "/permits", Icon: TbLockAccess },
  { title: "Payments", path: "/payments", Icon: MdOutlinePayments },
  {
    title: "Production",
    path: "/production",
    Icon: MdProductionQuantityLimits,
  },
  {
    title: "Maintenance",
    path: "/maintenance",
    Icon: HiOutlineWrenchScrewdriver,
  },
  {
    title: "Settings",
    path: "/settings",
    Icon: TbSettings ,
  },
];
