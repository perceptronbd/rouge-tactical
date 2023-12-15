import {
  TbHome2,
  TbPackage,
  TbFileInvoice,
  TbLockAccess,
} from "react-icons/tb";
import {
  MdOutlinePayments,
  MdProductionQuantityLimits,
  MdOutlineSell,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaWrench } from "react-icons/fa6";

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
    Icon: FaWrench,
  },
  {
    title: "Settings",
    path: "/settings",
    Icon: IoMdSettings,
  },
];
