import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Button,
  ContentModal,
  Form,
  Modal,
  SelectInput,
  Vendor,
  AgingSummary,
  UpdateForm,
} from "../../components";
import { Table } from "./Table";
import { data } from "../../mock/invoice";
import { vendorData } from "../../mock/vendor";
import { vendorInputs } from "./vendorInputs";
import { invoiceInputs } from "./invoiceInputs";

export const Invoice = () => {
  //data states
  const [agingSummary, setAgingSummary] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [tableData, setTableData] = useState(data);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  //loading states
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingAgingSummary, setLoadingAgingSummary] = useState(false);
  //modal states
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
      setLoadingAgingSummary(true);
      setTimeout(() => {
        const invoice = data.filter(
          (invoice) => invoice.vendor === vendorDetails.name
        );
        setLoadingTable(false);
        setLoadingAgingSummary(false);
        setTableData(invoice);

        const currentDate = new Date();
        const summary = {
          current: 0,
          "0 - 30": 0,
          "31 - 60": 0,
          "61 - 90": 0,
          "> 90": 0,
        };

        invoice.forEach((item) => {
          const updatedAt = new Date(item.date);
          const daysDifference = Math.floor(
            (currentDate - updatedAt) / (1000 * 60 * 60 * 24)
          );

          if (daysDifference <= 1) {
            summary["current"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 30) {
            summary["0 - 30"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 60) {
            summary["31 - 60"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 90) {
            summary["61 - 90"] += item.totalAmount - item.depositedAmount;
          } else {
            summary["> 90"] += item.totalAmount - item.depositedAmount;
          }
        });

        setAgingSummary(summary);

        console.log(summary);
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
    console.log(e.target.value);
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setShowVendorForm(false);
    setModalMessage("Process Successfull!");
    setIsError(false);
    console.log(invoiceDetails);
  };

  const openInvoiceForm = () => {
    setShowInvoiceForm(true);
  };

  return (
    <section className="bg-foreground w-full h-full p-4 rounded">
      <section className="h-70 mb-2 flex justify-between">
        <div>
          <div className="flex items-center gap-6 mb-2">
            <SelectInput
              id="vendor"
              name="vendor"
              label="Select Vendor"
              className="w-64"
              value={selectedVendor}
              onChange={handleVendorChange}
              selectOpts={vendorData}
            />

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
            <Vendor vendor={vendorDetails} />
          ) : (
            <section className="h-52 3xl:h-56" />
          )}
        </div>

        <AgingSummary
          agingSummary={agingSummary}
          loading={loadingAgingSummary}
        />
      </section>
      <div className="h-[330px] 3xl:h-[590px]">
        <Table
          data={tableData}
          loading={loadingTable}
          setShowForm={setShowEditForm}
          setInvoiceDetails={setInvoiceDetails}
        />
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
      <ContentModal isOpen={showEditForm} setShowModal={setShowEditForm}>
        <UpdateForm
          formTitle={"Update Invoice"}
          inputFields={invoiceInputs}
          icon={BsPersonFillAdd}
          data={invoiceDetails}
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
