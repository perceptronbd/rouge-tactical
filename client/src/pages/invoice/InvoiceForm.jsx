import React, { useState } from "react";
import { MdOutlineArrowBackIosNew, MdOutlinePlaylistAdd } from "react-icons/md";
import { Button, FormInput, Modal, SelectInput, Text } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidAddToQueue } from "react-icons/bi";

export const InvoiceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allVendors = location.state;

  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    date: "",
    invoiceNumber: "",
    vendor: "",
    items: [{ item: "", quantity: "", unitCost: "", subTotal: "" }],
    totalAmount: "",
    depositedAmount: "",
    status: "",
    updatedAt: "",
  });

  const [additionalFields, setAdditionalFields] = useState([]); // Store additional fields

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
    const totalAmount =
      (subTotals.length > 0
        ? subTotals.reduce((acc, subtotal) => acc + subtotal, 0)
        : 0) - (isNaN(depositedAmount) ? 0 : depositedAmount);

    updatedValues.totalAmount = totalAmount.toFixed(2);
    setValues(updatedValues);
  };

  const addField = () => {
    // Add an additional form input field to the list
    setAdditionalFields([...additionalFields, { id: additionalFields.length }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage("Invoice Added Successfully!");
    setIsError(false);
    console.log(values);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-foreground h-full w-full p-4 flex flex-col justify-between rounded"
      >
        <div className="w-full flex justify-between items-start">
          <Text variant={"h2"}>New Invoice</Text>
          <Button
            icon={MdOutlineArrowBackIosNew}
            className={"w-10 m-0"}
            onClick={() => {
              navigate(-1);
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
              value={values.date}
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
              selectOpts={allVendors}
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
              id="totalAmount"
              name="totalAmount"
              label="Total Amount"
              type="text"
              placeholder="Total Amount"
              required={true}
              value={values.totalAmount}
              onChange={handleChange}
              readOnly={true}
            />
          </div>
        </section>
        <Button icon={MdOutlinePlaylistAdd} className={"w-48 m-0"}>
          Add New
        </Button>
        <Modal
          isOpen={showModal}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          isError={isError}
        />
      </form>
    </>
  );
};
