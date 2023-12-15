import { FaCircleInfo, FaFile, FaBell } from "react-icons/fa6";
import Notification from "./Notification";
import DocsManagement from "./DocsManagement";
import CompanyInfo from "./CompanyInfo";
import { Container, Tabs } from "../../components";

const tabs = [
  {
    label: "Company Info",
    content: <CompanyInfo />,
    icon: FaCircleInfo,
  },
  {
    label: "Docs Management",
    content: <DocsManagement />,
    icon: FaFile,
  },
  {
    label: "Notification",
    content: <Notification />,
    icon: FaBell,
  },
];

export default function Settings() {
  const role = "admin";

  return (
    <Container className={"bg-background p-0 rounded-none hfu"}>
      <Tabs tabs={role === "admin" && tabs} />
    </Container>
  );
}
