import React from "react";
import { capitalizeFirstWord } from "../../utils";

export const Vendor = ({ vendor }) => {
  return (
    <section className="px-4 py-2 flex flex-col gap-2 w-80 h-52 3xl:h-56 border rounded">
      <div className="flex gap-4 ">
        <p className="w-16 text-textColor-light ">Contact</p>
        <p>{vendor.contact}</p>
      </div>
      <div className="flex gap-4">
        <p className="w-16 text-textColor-light">Phone</p>
        <p>{vendor.phone}</p>
      </div>
      <div className="flex gap-4">
        <p className="w-16 text-textColor-light">Vendor</p>
        <p>{capitalizeFirstWord(vendor.name)}</p>
      </div>
      <div className="flex gap-4">
        <p className="w-16 text-textColor-light">Email</p>
        <p>{vendor.email}</p>
      </div>
      <div className="flex gap-4">
        <p className="w-16 text-textColor-light">Address</p>
        <p className={"p-ellipsis w-36"}>{vendor.address}</p>
      </div>
    </section>
  );
};
