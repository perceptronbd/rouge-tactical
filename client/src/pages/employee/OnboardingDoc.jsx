import React, { useState } from "react";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { Button, Checkbox } from "../../components";

export const OnboardingDoc = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    let checked = false;
    for (let i = 1; i <= data.length; i++) {
      if (document.getElementById(i).checked) {
        checked = true;
      }
    }
    setIsChecked(checked);
  };

  return (
    <article className="border rounded p-2 w-full h-fit">
      <div className="h-24 overflow-y-auto">
        {
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
        }
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

        {/* <Button
          className={"mb-0 w-10"}
          variant={"highlight"}
          onClick={handleAddDoc}
        >
          +
        </Button> */}
      </div>
      {/* <ContentModal isOpen={showModal} closeModal={closeModal}>
        <AddDocForm />
      </ContentModal> */}
    </article>
  );
};
