import React, { useEffect, useState } from "react";
import { BiMessageSquareEdit, BiSolidAddToQueue } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteInvoice, updateInvoice } from "../../api/universal/invoice";
import {
  Button,
  ContentModal,
  FormInput,
  Modal,
  SelectInput,
  Text,
} from "../../components";
import { useModal } from "../../hooks";
import { formatDateToYYYYMMDD } from "../../utils";

export const InvoiceUpdateForm = () => {
  const statusOpts = [
    { value: "open", name: "Open" },
    { value: "close", name: "Close" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const { item: invoiceData, vendorData } = location.state;

  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();

  const {
    showModal: showConfirmDelete,
    openModal: openConfirmDelete,
    closeModal: closeConfirmDelete,
  } = useModal();

  const [values, setValues] = useState({
    invoiceId: invoiceData.invoiceId || "",
    date: invoiceData.date || "",
    invoiceNumber: invoiceData.invoiceNumber || "",
    vendor: invoiceData.vendorId || "",
    items: invoiceData.items || [
      { item: "", quantity: "", unitCost: "", subTotal: "" },
    ],
    remainingAmount: invoiceData.remainingAmount || "",
    totalAmount: invoiceData.totalAmount || "",
    depositedAmount: invoiceData.depositAmount || "",
    status: invoiceData.status || "",
  });

  const [additionalFields, setAdditionalFields] = useState([]);

  useEffect(() => {
    if (invoiceData.items.length > 0) {
      const additionalFields = [];
      for (let i = 0; i <= invoiceData.items.length - 1; i++) {
        additionalFields.push({ id: i });
      }
      setAdditionalFields([...additionalFields]);
    }
  }, [invoiceData.items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values };

    if (
      name.includes("item-") ||
      name.includes("quantity-") ||
      name.includes("unitCost-")
    ) {
      // This is an item field, so update the items array
      const itemId = name.split("-")[1];
      const updatedItems = [...updatedValues.items];
      if (!updatedItems[itemId]) {
        updatedItems[itemId] = {};
      }
      updatedItems[itemId][name.split("-")[0]] = value;

      // Calculate the sub-total for the item
      const quantity = parseFloat(updatedItems[itemId].quantity);
      const unitCost = parseFloat(updatedItems[itemId].unitCost);
      updatedItems[itemId].subTotal =
        isNaN(quantity) || isNaN(unitCost)
          ? ""
          : (quantity * unitCost).toFixed(2);

      updatedValues.items = updatedItems;
    } else {
      // This is not an item field, update other fields
      updatedValues[name] = value;
    }

    // Calculate the total amount based on sub-totals and deposited amount
    const subTotals = updatedValues.items
      .map((item) => parseFloat(item.subTotal))
      .filter((subtotal) => !isNaN(subtotal));
    const depositedAmount = parseFloat(updatedValues.depositedAmount);
    const remainingAmount =
      (subTotals.length > 0
        ? subTotals.reduce((acc, subtotal) => acc + subtotal, 0)
        : 0) - (isNaN(depositedAmount) ? 0 : depositedAmount);
    const totalAmount =
      subTotals.length > 0
        ? subTotals.reduce((acc, subtotal) => acc + subtotal, 0)
        : 0;

    updatedValues.remainingAmount = remainingAmount.toFixed(2);
    updatedValues.totalAmount = totalAmount.toFixed(2);
    setValues(updatedValues);
  };

  const addField = () => {
    setAdditionalFields([...additionalFields, { id: additionalFields.length }]);
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      updateInvoice(values).then((res) => {
        console.log(res);
        const code = res.status;
        const message = res.data.message;
        if (code === 200) {
          openModal(message, false);
        } else {
          openModal(message, true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = () => {
    openConfirmDelete();
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    try {
      deleteInvoice(values).then((res) => {
        console.log(res);
        const code = res.status;
        const message = res.data.message;
        if (code === 200) {
          openModal(message, false);
          closeConfirmDelete();
          setTimeout(() => {
            navigate("/invoice");
          }, 1000);
        } else {
          openModal(message, true);
          closeConfirmDelete();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article className="bg-foreground h-full w-full p-4 flex flex-col justify-between rounded">
        <div className="w-full flex justify-between items-start">
          <Text variant={"h2"}>Update Invoice</Text>
          <Button
            icon={MdOutlineArrowBackIosNew}
            className={"w-10 m-0"}
            onClick={() => {
              navigate("/invoice");
            }}
          />
        </div>
        <section className="grid grid-cols-2 mb-6 overflow-y-auto">
          <div>
            <FormInput
              id="date"
              name="date"
              label="Date"
              type="date"
              placeholder="Date"
              required={true}
              value={formatDateToYYYYMMDD(values.date)}
              onChange={handleChange}
            />
            <FormInput
              id="invoiceNumber"
              name="invoiceNumber"
              label="Invoice Number"
              type="text"
              placeholder="Invoice Number"
              required={true}
              value={values.invoiceNumber}
              onChange={handleChange}
            />
            <SelectInput
              id="vendor"
              name="vendor"
              label="Vendor"
              selectOpts={vendorData}
              required={true}
              className={"col-span-2"}
              value={values.vendor}
              defaultValue={"Select Vendor"}
              onChange={handleChange}
            />
          </div>
          <Button
            icon={BiSolidAddToQueue}
            className={"col-span-2"}
            variant={"ghost"}
            onClick={addField}
          >
            Add Items
          </Button>
          {additionalFields.map((field) => (
            <div
              key={field.id}
              className="col-span-2 flex flex-col gap-2 px-2 my-1 border rounded-md w-fit"
            >
              <div className="flex items-center gap-2">
                <FormInput
                  id={`item-${field.id}`}
                  name={`item-${field.id}`}
                  label="Item"
                  type="text"
                  placeholder="Item"
                  required={true}
                  value={values.items[field.id]?.item}
                  className={"w-40 rt-sm:w-40"}
                  inputClassName={"w-40 rt-sm:w-40"}
                  onChange={handleChange}
                />
                <FormInput
                  id={`quantity-${field.id}`}
                  name={`quantity-${field.id}`}
                  label="Quantity"
                  type="number"
                  placeholder="Quantity"
                  required={true}
                  value={values.items[field.id]?.quantity}
                  className={"w-32 rt-sm:w-32"}
                  inputClassName={"w-32 rt-sm:w-32"}
                  onChange={handleChange}
                />
                <FormInput
                  id={`unitCost-${field.id}`}
                  name={`unitCost-${field.id}`}
                  label="Unit Cost"
                  type="number"
                  placeholder="Unit Cost"
                  required={true}
                  value={values.items[field.id]?.unitCost}
                  className={"w-32 rt-sm:w-32"}
                  inputClassName={"w-32 rt-sm:w-32"}
                  onChange={handleChange}
                />
                <FormInput
                  id={`subTotal-${field.id}`}
                  name={`subTotal-${field.id}`}
                  label="Sub Total"
                  type="number"
                  placeholder="Sub Total"
                  required={true}
                  value={values.items[field.id]?.subTotal}
                  className={"w-32 rt-sm:w-32"}
                  inputClassName={"w-32 rt-sm:w-32"}
                  readOnly={true}
                />
              </div>
            </div>
          ))}
          <div>
            <FormInput
              id="depositedAmount"
              name="depositedAmount"
              label="Deposited Amount"
              type="number"
              placeholder="Deposited Amount"
              required={true}
              value={values.depositedAmount}
              onChange={handleChange}
            />
            <FormInput
              id="remainingAmount"
              name="remainingAmount"
              label="Remaining Amount"
              type="text"
              placeholder="Remaining Amount"
              required={true}
              value={values.remainingAmount}
              onChange={handleChange}
              readOnly={true}
            />
            <FormInput
              id="totalAmount"
              name="totalAmount"
              label="Total Amount"
              type="text"
              placeholder="Total Amount"
              required={true}
              value={values.totalAmount}
              onChange={handleChange}
              readOnly={true}
            />{" "}
            <SelectInput
              id="status"
              name="status"
              label="Status"
              selectOpts={statusOpts}
              required={true}
              value={values.status}
              defaultValue={"Select Vendor"}
              onChange={handleChange}
            />
          </div>
        </section>

        <div className="flex gap-4">
          <Button
            icon={BiMessageSquareEdit}
            className={"m-0"}
            variant={"success"}
            onClick={onUpdate}
          >
            Update
          </Button>
          <Button
            icon={MdDeleteOutline}
            className={"m-0"}
            variant={"danger"}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
        <ContentModal
          isOpen={showConfirmDelete}
          closeModal={closeConfirmDelete}
        >
          <Button
            variant={"ghost"}
            onClick={confirmDelete}
          >
            Confirm Delete?
          </Button>
        </ContentModal>
        <Modal
          isOpen={showModal}
          closeModal={closeModal}
          modalMessage={modalMessage}
          isError={isError}
        />
      </article>
    </>
  );
};
