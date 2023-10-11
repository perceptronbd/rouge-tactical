import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { Table } from "./Table";
import { data } from "../../mock/invoice";
import { vendorData } from "../../mock/vendor";
import { Button } from "../../components";

export const Invoice = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
    const vendor = vendorData.find(
      (vendor) => vendor.id === event.target.value
    );
    console.log(event.target.value, vendor);
  };

  return (
    <section className="bg-foreground w-full h-full p-4 rounded">
      <section className="h-70 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <div>
            <select
              id="vendor"
              value={selectedVendor}
              onChange={handleVendorChange}
              className="peer block border rounded-lg w-72 p-2 focus:outline-none focus:ring-1 focus:border-accent-tertiary "
            >
              <option value="" className="text-textColor-light">
                Select Vendor
              </option>
              {vendorData.map((vendor, index) => (
                <option
                  key={index}
                  value={vendor.id}
                  className="text-textColor hover:text-accent-tertiary"
                >
                  {vendor.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="vendor"
              className="absolute text-sm px-1 text-gray-500 duration-300 transform -translate-y-6 bg-foreground scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-accent-tertiary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-white"
            >
              Select Vendor
            </label>
          </div>
          <Button className={"w-10 m-0"} variant={"ghost"}>
            +
          </Button>
        </div>
        <div className="px-4 py-2 flex flex-col gap-2 w-fit border rounded">
          <div className="flex gap-4">
            <p className="w-16 text-textColor-light">Contact</p>
            <p>{selectedVendor}</p>
          </div>
          <div className="flex gap-4">
            <p className="w-16 text-textColor-light">Phone</p>
            <p>123-456-7800</p>
          </div>
          <div className="flex gap-4">
            <p className="w-16 text-textColor-light">Vendor</p>
            <p>XYZ Inc.</p>
          </div>
          <div className="flex gap-4">
            <p className="w-16 text-textColor-light">Email</p>
            <p>j.doe@gmail.com</p>
          </div>
          <div className="flex gap-4">
            <p className="w-16 text-textColor-light">Address</p>
            <p className={"p-ellipsis w-36"}>
              1234 Fairy Ln, San Diego CA, 92110
            </p>
          </div>
        </div>
      </section>
      <Table data={data} />
      <Button icon={MdPostAdd}>New Invoice</Button>
    </section>
  );
};
