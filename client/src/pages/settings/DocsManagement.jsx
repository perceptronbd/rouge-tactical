import { DocTabs } from "../../components/docTabs/DocTabs";
import ChecklistDocs from "./ChecklistDocs";
import OnboardingDocs from "./OnboardingDocs";

const tabs = [
  {
    label: "Onboarding Docs",
    content: <OnboardingDocs />,
  },
  {
    label: "Checklist Docs",
    content: <ChecklistDocs />,
  },
];

export default function DocsManagement() {
  const role = "admin";

  return (
    <div className={"h-full w-full pt-10 pl-3 bg-foreground"}>
      <DocTabs tabs={role === "admin" && tabs} />
    </div>
  );
}
