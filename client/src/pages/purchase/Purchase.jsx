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
import { purchaseData } from "../../mock/purchase";
import { vendorData } from "../../mock/vendor";
import { vendorInputs } from "./vendorInputs";
import { purchaseInputs } from "./purchaseInputs";
import { PurchasePreview } from "./PurchasePreview";
import { useModal } from "../../hooks";

export const Purchase = () => {
  const navaigate = useNavigate();
  //data states
  const [agingSummary, setAgingSummary] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [tableData, setTableData] = useState(purchaseData);
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  //loading states
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingAgingSummary, setLoadingAgingSummary] = useState(false);

  //modal states
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
    setLoading(true);

    setTimeout(() => {
      const vendor = vendorData.find((vendor) => vendor.id === selectedVendor);
      if (!vendor) {
        setTableData(purchaseData);
        setSelectedVendor(null);
        setVendorDetails(null);
        setLoading(false);
        return;
      }
      setLoading(false);
      setVendorDetails(vendor);
    }, 1000);
  }, [selectedVendor]);

  useEffect(() => {
    if (vendorDetails) {
      setLoadingTable(true);
      setLoadingAgingSummary(true);
      setTimeout(() => {
        const purchase = purchaseData.filter(
          (purchase) => purchase.vendor === vendorDetails.name
        );
        setLoadingTable(false);
        setLoadingAgingSummary(false);
        setTableData(purchase);

        const currentDate = new Date();
        const summary = {
          current: 0,
          "0 - 30": 0,
          "31 - 60": 0,
          "61 - 90": 0,
          "> 90": 0,
        };

        purchase.forEach((item) => {
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
    openVendorModal();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.value);
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    closeVendorModal();
    openModal("Purchase Order Updated Successfully", false);
    console.log(purchaseDetails);
  };

  const openPurchaseForm = () => {
    navaigate("/purchase/new");
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
              defaultValue={"View All"}
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
          setPurchaseDetails={setPurchaseDetails}
          openPreview={openPreview}
        />
      </div>
      <Button
        icon={MdPostAdd}
        className={"my-2 3xl:my-4"}
        onClick={openPurchaseForm}
      >
        New PO
      </Button>

      {/* Pop up forms */}
      <ContentModal isOpen={showVendorModal} closeModal={closeVendorModal}>
        <Form
          formTitle={"Add Vendor"}
          inputFields={vendorInputs}
          icon={BsPersonFillAdd}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>

      <ContentModal isOpen={showForm} closeModal={closeForm}>
        <UpdateForm
          formTitle={"Update Purchase Order"}
          inputFields={purchaseInputs}
          data={purchaseDetails}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      </ContentModal>
      <Preview
        isOpen={showPreview}
        closePreview={closePreview}
        data={purchaseDetails}
      >
        <PurchasePreview data={purchaseDetails} />
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
