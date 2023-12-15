import React, { useState } from "react";
import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";

export const DocTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <section className="w-full h-full">
      <div className="flex p-1 bg-gray-200 w-fit gap-1 rounded-[calc(0.375rem+0.25rem)]">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            icon={tab.icon}
            label={tab.label}
            isActive={activeTab === tab.label}
            onClick={() => handleTabClick(tab.label)}
          />
        ))}
      </div>
      <>
        {tabs.map((tab) => (
          <TabPanel key={tab.label} isActive={tab.label === activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </>
    </section>
  );
};
