import React, { useState } from "react";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { Button, Checkbox, ContentModal, Text } from "../../components";
import { AddDocForm } from "./AddDocForm";

export const OnboardingDoc = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = () => {
    let checked = false;
    for (let i = 1; i <= data.length; i++) {
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
        {data !== undefined ? (
          data?.length > 0 ? (
            <section className="grid grid-rows-3 grid-cols-2 w-full">
              {data.map((item) => (
                <Checkbox
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  onChange={handleCheckboxChange}
                />
              ))}
            </section>
          ) : (
            <section className="h-full w-full flex justify-center items-center">
              <Text variant={"h2"} type={"bold"} className={"text-neutral-200"}>
                Select A User To See The Documents
              </Text>
            </section>
          )
        ) : (
          <section className="h-full w-full flex justify-center items-center">
            <Text variant={"h2"} type={"bold"} className={"text-neutral-200"}>
              No Documents Found
            </Text>
          </section>
        )}
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

        <Button
          className={"mb-0 w-10"}
          variant={"highlight"}
          onClick={handleAddDoc}
        >
          +
        </Button>
      </div>
      <ContentModal isOpen={showModal} setShowModal={setShowModal}>
        <AddDocForm />
      </ContentModal>
    </article>
  );
};
