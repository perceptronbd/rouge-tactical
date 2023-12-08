import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createVendor, getAllPurchases } from "../../api";
import {
  AgingSummary,
  Button,
  ContentModal,
  Form,
  Modal,
  Preview,
  SelectInput,
  Vendor,
} from "../../components";
import { useDataStates, useModal } from "../../hooks";
import { PurchasePreview } from "./PurchasePreview";
import { Table } from "./Table";
import { vendorInputs } from "./vendorInputs";

export const Purchase = () => {
  const navaigate = useNavigate();

  const [allPurchases, setAllPurchases] = useState([]);

  const {
    transactionDetails: purchaseDetails,
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
    setTransactionDetails: setPurchaseDetails,
  } = useDataStates({ data: allPurchases });

  const {
    showModal: showVendorModal,
    openModal: openVendorModal,
    closeModal: closeVendorModal,
  } = useModal();

  const {
    showModal: showPreview,
    openModal: openPreview,
    closeModal: closePreview,
  } = useModal();

  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();

  useEffect(() => {
    const fetchPOs = async () => {
      try {
        getAllPurchases().then((res) => {
          const code = res.status;
          const message = res.data.message;
          if (code === 200) {
            setAllPurchases(res.data.data);
          } else {
            console.log(message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPOs();
  }, []);

  const openVendorForm = () => {
    openVendorModal();
  };

  const submitAddVendor = async (e) => {
    e.preventDefault();
    try {
      console.log(purchaseDetails);
      createVendor(purchaseDetails).then((res) => {
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
              selectOpts={allVendors}
            />

            <Button
              className={"w-10 m-0"}
              variant={"ghost"}
              onClick={openVendorForm}
              icon={AiOutlinePlus}
            />
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
          setPurchaseDetails={setPurchaseDetails}
          openPreview={openPreview}
          vendorData={allVendors}
        />
      </div>
      <Button
        icon={MdPostAdd}
        className={"my-2 3xl:my-4"}
        onClick={() => {
          navaigate("/purchase/new", { state: allVendors });
        }}
      >
        New PO
      </Button>

      {/* Pop up forms */}
      <ContentModal
        isOpen={showVendorModal}
        closeModal={closeVendorModal}
      >
        <Form
          formTitle={"Add Vendor"}
          inputFields={vendorInputs}
          icon={BsPersonFillAdd}
          handleChange={handleChange}
          onSubmit={submitAddVendor}
        />
      </ContentModal>

      <Preview
        isOpen={showPreview}
        closePreview={closePreview}
        data={purchaseDetails}
      >
        <PurchasePreview
          allVendors={allVendors}
          transactionDetails={purchaseDetails}
        />
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
