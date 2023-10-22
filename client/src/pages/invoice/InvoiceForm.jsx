import React, { useState } from "react";
import { MdOutlineArrowBackIosNew, MdOutlinePlaylistAdd } from "react-icons/md";
import { Button, FormInput, Modal, SelectInput, Text } from "../../components";
import { vendorData } from "../../mock/vendor";
import { useNavigate } from "react-router-dom";
import { BiSolidAddToQueue } from "react-icons/bi";

export const InvoiceForm = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    date: "",
    invoiceNumber: "",
    vendor: "",
    items: [{ item: "", quantity: "", totalCost: "" }],
    totalAmount: "",
    depositedAmount: "",
    status: "",
    updatedAt: "",
  });

  const [additionalFields, setAdditionalFields] = useState([]); // Store additional fields

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name.includes("item-") ||
      name.includes("quantity-") ||
      name.includes("totalCost-")
    ) {
      // This is an item field, so update the items array
      const itemId = name.split("-")[1];
      const updatedItems = [...values.items];
      if (!updatedItems[itemId]) {
        updatedItems[itemId] = {};
      }
      updatedItems[itemId][name.split("-")[0]] = value;
      setValues((prevValues) => ({
        ...prevValues,
        items: updatedItems,
      }));
    } else {
      // This is not an item field, update other fields
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const addField = () => {
    // Add an additional form input field to the list
    setAdditionalFields([...additionalFields, { id: additionalFields.length }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage("Employee added successfully!");
    setIsError(true);
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
            selectOpts={vendorData}
            required={true}
            className={"col-span-2"}
            value={values.vendor}
            onChange={handleChange}
          />
          <Button
            icon={BiSolidAddToQueue}
            className={"col-span-2"}
            onClick={addField}
          >
            Add Items
          </Button>
          {additionalFields.map((field) => (
            <div
              key={field.id}
              className="col-span-2 flex flex-col gap-2 border rounded-md p-2 my-3 w-fit"
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
                  onChange={handleChange}
                />
                <FormInput
                  id={`quantity-${field.id}`}
                  name={`quantity-${field.id}`}
                  label="Quantity"
                  type="text"
                  placeholder="Quantity"
                  required={true}
                  value={values.items[field.id]?.quantity}
                  onChange={handleChange}
                />
                <FormInput
                  id={`totalCost-${field.id}`}
                  name={`totalCost-${field.id}`}
                  label="Total Cost"
                  type="text"
                  placeholder="Total Cost"
                  required={true}
                  value={values.items[field.id]?.totalCost}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          <FormInput
            id="totalAmount"
            name="totalAmount"
            label="Total Amount"
            type="text"
            placeholder="Total Amount"
            required={true}
            value={values.totalAmount}
            onChange={handleChange}
          />
          <FormInput
            id="depositedAmount"
            name="depositedAmount"
            label="Deposited Amount"
            type="text"
            placeholder="Deposited Amount"
            required={true}
            value={values.depositedAmount}
            onChange={handleChange}
          />
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
