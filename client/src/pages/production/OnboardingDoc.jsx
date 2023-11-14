import React, { useState } from "react";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { Button, Checkbox, ContentModal, Text } from "../../components";
import { AddDocForm } from "./AddDocForm";

const checkboxLabel = [
  { id: 1, label: "Final Assembly" },
  { id: 2, label: "Barrel Cleanup" },
  { id: 3, label: "Grip Initial Assembly" },
  { id: 4, label: "Slide Clean Up" },
  { id: 5, label: "Extractor Fitting" },
  { id: 6, label: "Frame Cleanup" },
  { id: 7, label: "Test Notes" },
];

export const OnboardingDoc = ({ role }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = () => {
    let checked = false;
    for (let i = 1; i <= checkboxLabel.length; i++) {
      if (document.getElementById(i).checked) {
        checked = true;
      }
    }
    setIsChecked(checked);
  };

  const handleAddDoc = () => {
    setShowModal(true);
  };

  return (
    <article className="border rounded p-2 flex flex-col w-full h-full justify-between">
      <Text variant={"h2"} className={"mb-4"}>
        Checklist
      </Text>
      <div className="h-full overflow-y-auto">
        <section className="grid grid-rows-3 grid-cols-2 w-full">
          {checkboxLabel.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={item.label}
              onChange={handleCheckboxChange}
            />
          ))}
        </section>
      </div>
      <div className="flex gap-2 m-0">
        <Button
          variant={"ghost"}
          icon={AiFillPrinter}
          className={"mb-0 w-36"}
          disabled={!isChecked}
        >
          Print
        </Button>
        <Button
          icon={AiOutlineDownload}
          className={"mb-0 w-40"}
          disabled={!isChecked}
        >
          Download
        </Button>
        {role === "admin" && (
          <Button
            className={"mb-0 w-10"}
            variant={"highlight"}
            onClick={handleAddDoc}
          >
            +
          </Button>
        )}
      </div>
      <ContentModal isOpen={showModal} setShowModal={setShowModal}>
        <AddDocForm />
      </ContentModal>
    </article>
  );
};
