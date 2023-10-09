import React, { useState } from "react";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { Button, Checkbox, ContentModal, DocInput } from "../../components";
import { AddDocForm } from "./AddDocForm";

const checkboxLabel = [
  { id: 1, label: "Non Disclosure Agreement (NDA)" },
  { id: 2, label: "New Employee Information Sheet" },
  { id: 3, label: "Request for Live Scan Service" },
  { id: 4, label: "Certificate fo Eligibility Information" },
  { id: 5, label: "Certificate fo Eligibility Application" },
  { id: 6, label: "Live Scan Locations" },
  { id: 7, label: "Live Scan Locations" },
  { id: 8, label: "Live Scan Locations" },
];

export const OnboardingDoc = ({ data }) => {
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
    <article className="border rounded p-2 w-full h-fit">
      <div className="h-24 overflow-y-auto">
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
        {data.role === "admin" && (
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
