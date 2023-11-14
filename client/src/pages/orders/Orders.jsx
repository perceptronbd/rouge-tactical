import React from "react";
import { BsListCheck } from "react-icons/bs";
import {
  MdFormatListBulletedAdd,
  MdOutlineManageHistory,
} from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { Container, Tabs } from "../../components";
import { Items } from "./Items";
import { Form } from "./Form";
import { History } from "./History";
import { Manage } from "./Manage";

const tabsEmployee = [
  {
    label: "Approved Items",
    content: <Items />,
    icon: BsListCheck,
  },
  {
    label: "New Item Request",
    content: <Form />,
    icon: MdFormatListBulletedAdd,
  },
  {
    label: "Order History",
    content: <History />,
    icon: BiHistory,
  },
];
const tabsAdmin = [
  {
    label: "Approved Items",
    content: <Items />,
    icon: BsListCheck,
  },
  {
    label: "New Item Request",
    content: <Form />,
    icon: MdFormatListBulletedAdd,
  },
  {
    label: "Order History",
    content: <History />,
    icon: BiHistory,
  },
  {
    label: "Manage Orders",
    content: <Manage />,
    icon: MdOutlineManageHistory,
  },
];

export const Orders = () => {
  const role = "admin";

  return (
    <Container className={"bg-background p-0 rounded-none"}>
      <Tabs tabs={role === "admin" ? tabsAdmin : tabsEmployee} />
    </Container>
  );
};
