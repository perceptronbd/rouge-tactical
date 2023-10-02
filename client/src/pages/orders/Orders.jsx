import React from "react";
import { BsListCheck } from "react-icons/bs";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { Container, Tabs } from "../../components";
import { Items } from "./Items";
import { Form } from "./Form";
import { History } from "./History";

export const tabs = [
  {
    label: "Approved Items",
    content: <Items />,
    icon: BsListCheck,
  },
  {
    label: "Request Form",
    content: <Form />,
    icon: MdFormatListBulletedAdd,
  },
  {
    label: "Order History",
    content: <History />,
    icon: BiHistory,
  },
];

export const Orders = () => {
  return (
    <Container className={"bg-background p-0 rounded-none"}>
      <Tabs tabs={tabs} />
    </Container>
  );
};
