import React from "react";
import { AiFillPrinter, AiOutlineDownload } from "react-icons/ai";
import { Button, Checkbox } from "../../components";

export const OnboardingDoc = () => {
  return (
    <article className="border rounded p-2 w-full h-fit">
      <section className="flex">
        <div className="w-1/2">
          <Checkbox label={"Non Disclosure Agreement (NDA)"} />
          <Checkbox label={"New Employee Information Sheet"} />
          <Checkbox label={"Request for Live Scan Service"} />
        </div>
        <div className="w-1/2">
          <Checkbox label={"Certificate fo Eligibility Information"} />
          <Checkbox label={"Certificate fo Eligibility Application"} />
          <Checkbox label={"Live Scan Locations"} />
        </div>
      </section>
      <div className="flex gap-2 m-0">
        <Button variant={"ghost"} icon={AiFillPrinter} className={"mb-0 w-36"}>
          Print
        </Button>
        <Button icon={AiOutlineDownload} className={"mb-0 w-40"}>
          Download
        </Button>
      </div>
    </article>
  );
};
