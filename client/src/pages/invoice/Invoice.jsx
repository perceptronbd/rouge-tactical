import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button, ContentModal, Form, Modal } from "../../components";
import { Table } from "./Table";
import { data } from "../../mock/invoice";
import { vendorData } from "../../mock/vendor";
import { vendorInputs } from "./vendorInputs";
import { invoiceInputs } from "./invoiceInputs";
import { capitalizeFirstWord } from "../../utils/capitalize";

export const Invoice = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [tableData, setTableData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const vendor = vendorData.find((vendor) => vendor.id === selectedVendor);
      setLoading(false);
      setVendorDetails(vendor);
    }, 1000);
  }, [selectedVendor]);

  useEffect(() => {
    if (vendorDetails) {
      setLoadingTable(true);
      setTimeout(() => {
        const invoice = data.filter((invoice) => {
          console.log(invoice.vendor, vendorDetails.name);
          return invoice.vendor === vendorDetails.name;
        });
        setLoadingTable(false);
        setTableData(invoice);
      }, 1000);
    }
  }, [vendorDetails]);

  const handleVendorChange = (event) => {
    setSelectedVendor(parseInt(event.target.value));
  };

  const openVendorForm = () => {
    setShowVendorForm(true);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setShowVendorForm(false);
    setModalMessage("Employee added successfully!");
    setIsError(false);
  };

  const openInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  return (
    <section className="bg-foreground w-full h-full p-4 rounded">
      <section className="h-70 mb-2">
        <div className="flex items-center gap-6 mb-2">
          <div>
            <select
              id="vendor"
              value={selectedVendor}
              onChange={handleVendorChange}
              className="peer block border rounded-lg w-64 p-2 focus:outline-none focus:ring-1 focus:border-accent-tertiary "
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

          <Button
            className={"w-10 m-0"}
            variant={"ghost"}
            onClick={openVendorForm}
          >
            +
          </Button>
        </div>
        {loading ? (
          <div className="w-80 h-52 3xl:h-56 border rounded flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        ) : vendorDetails ? (
          <section className="px-4 py-2 flex flex-col gap-2 w-80 h-52 3xl:h-56 border rounded">
            <div className="flex gap-4 ">
              <p className="w-16 text-textColor-light ">Contact</p>
              <p>{vendorDetails.contact}</p>
            </div>
            <div className="flex gap-4">
              <p className="w-16 text-textColor-light">Phone</p>
              <p>{vendorDetails.phone}</p>
            </div>
            <div className="flex gap-4">
              <p className="w-16 text-textColor-light">Vendor</p>
              <p>{capitalizeFirstWord(vendorDetails.name)}</p>
            </div>
            <div className="flex gap-4">
              <p className="w-16 text-textColor-light">Email</p>
              <p>{vendorDetails.email}</p>
            </div>
            <div className="flex gap-4">
              <p className="w-16 text-textColor-light">Address</p>
              <p className={"p-ellipsis w-36"}>{vendorDetails.address}</p>
            </div>
          </section>
        ) : (
          <section className="h-52 3xl:h-56" />
        )}
      </section>
      <div className="h-[330px] 3xl:h-[590px]">
        <Table data={tableData} loading={loadingTable} />
      </div>
      <Button
        icon={MdPostAdd}
        className={"my-2 3xl:my-4"}
        onClick={openInvoiceForm}
      >
        New Invoice
      </Button>

      {/* Pop up forms */}
      <ContentModal isOpen={showVendorForm} setShowModal={setShowVendorForm}>
        <Form
          formTitle={"Add Vendor"}
          inputFields={vendorInputs}
          icon={BsPersonFillAdd}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <ContentModal isOpen={showInvoiceForm} setShowModal={setShowInvoiceForm}>
        <Form
          formTitle={"Add Invoice"}
          inputFields={invoiceInputs}
          icon={BsPersonFillAdd}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <Modal
        isOpen={showModal}
        setShowModal={setShowModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </section>
  );
};
