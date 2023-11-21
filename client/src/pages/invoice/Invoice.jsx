import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Preview,
} from "../../components";
import { Table } from "./Table";
import { vendorInputs } from "./vendorInputs";
import { invoiceInputs } from "./invoiceInputs";
import { InvoicePreview } from "./InvoicePreview";
import { useModal, useDataStates } from "../../hooks";
import { createVendor, getAllInvoices } from "../../api";

export const Invoice = () => {
  const navaigate = useNavigate();

  const [allInvoices, setAllInvoices] = useState([]);

  const {
    transactionDetails: invoiceDetails,
    allVendors,
    selectedVendor,
    vendorDetails,
    tableData,
    agingSummary,
    loading,
    loadingTable,
    loadingAgingSummary,
    handleVendorChange,
    handleChange,
    setTransactionDetails: setInvoiceDetails,
  } = useDataStates({ data: allInvoices });

  const {
    showModal: showVendorModal,
    openModal: openVendorModal,
    closeModal: closeVendorModal,
  } = useModal();

  const {
    showModal: showForm,
    openModal: openForm,
    closeModal: closeForm,
  } = useModal();

  const {
    showModal: showPreview,
    openModal: openPreview,
    closeModal: closePreview,
  } = useModal();

  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        getAllInvoices().then((res) => {
          const code = res.status;
          const message = res.data.message;
          if (code === 200) {
            setAllInvoices(res.data.data);
          } else {
            console.log(message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoices();
  }, []);

  const openVendorForm = () => {
    openVendorModal();
  };

  const submitAddVendor = async (e) => {
    e.preventDefault();
    try {
      console.log(invoiceDetails);
      createVendor(invoiceDetails).then((res) => {
        const code = res.status;
        const message = res.data.message;
        if (code === 200) {
          closeVendorModal();
          openModal(message, false);
        } else {
          openModal(message, true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdateInvoice = async (e) => {
    e.preventDefault();
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
              defaultValue="View All"
              value={selectedVendor}
              onChange={handleVendorChange}
              selectOpts={allVendors}
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
          data={vendorDetails}
          agingSummary={agingSummary}
          loading={loadingAgingSummary}
        />
      </section>
      <div>
        <Table
          data={tableData}
          loading={loadingTable}
          openForm={openForm}
          setInvoiceDetails={setInvoiceDetails}
          openPreview={openPreview}
        />
      </div>
      <Button
        icon={MdPostAdd}
        className={"my-2 3xl:my-4"}
        onClick={() => {
          navaigate("/invoice/new", { state: allVendors });
        }}
      >
        New Invoice
      </Button>

      {/* Pop up forms */}
      <ContentModal isOpen={showVendorModal} closeModal={closeVendorModal}>
        <Form
          formTitle={"Add Vendor"}
          inputFields={vendorInputs}
          icon={BsPersonFillAdd}
          handleChange={handleChange}
          onSubmit={submitAddVendor}
        />
      </ContentModal>

      <ContentModal isOpen={showForm} closeModal={closeForm}>
        <UpdateForm
          formTitle={"Update Invoice"}
          inputFields={invoiceInputs}
          icon={BsPersonFillAdd}
          data={invoiceDetails}
          selectOpts={allVendors}
          handleChange={handleChange}
          onSubmit={submitUpdateInvoice}
        />
      </ContentModal>
      <Preview
        isOpen={showPreview}
        closePreview={closePreview}
        data={invoiceDetails}
      >
        <InvoicePreview data={invoiceDetails} />
      </Preview>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </section>
  );
};
