import React, { useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Button, FormInput, Modal, SelectInput } from "../../components";

const inputFields = [
  {
    id: "item",
    name: "item",
    label: "Item",
    type: "text",
    placeholder: "Item",
    required: true,
  },
  {
    id: "size",
    name: "size",
    label: "Size",
    type: "text",
    placeholder: "Size",
    required: true,
  },
  {
    id: "quantity",
    name: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "Quantity",
    required: true,
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "price",
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Price",
    required: true,
  },
  {
    id: "total amount",
    name: "total amount",
    label: "Total Amount",
    type: "number",
    placeholder: "Total Amount",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "deposit amount",
    name: "deposit amount",
    label: "Deposit Amount",
    type: "number",
    placeholder: "Deposit Amount",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "delivered items",
    name: "delivered items",
    label: "Delivered Items",
    type: "number",
    placeholder: "Delivered Items",
    required: true,
    pattern: "[0-9]{10}",
  },
  {
    id: "vendor",
    name: "vendor",
    label: "Vendor",
    selectOpts: [
      { value: "id-1", name: "Vendor 1" },
      { value: "id-2", name: "Vendor 2" },
      { value: "id-3", name: "Vendor 3" },
      { value: "id-4", name: "Vendor 4" },
      { value: "id-5", name: "Vendor 5" },
    ],
  },
  {
    id: "date",
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Date",
    required: true,
    pattern: "",
    errorMessage: "",
  },

  {
    id: "substitute vendor",
    name: "substitute vendor",
    label: "Substitute Vendor",
    selectOpts: [
      { value: "id-1", name: "Sub-Vendor 1" },
      { value: "id-2", name: "Sub-Vendor 2" },
      { value: "id-3", name: "Sub-Vendor 3" },
      { value: "id-4", name: "Sub-Vendor 4" },
      { value: "id-5", name: "Sub-Vendor 5" },
    ],
  },
  {
    id: "needed",
    name: "needed",
    label: "Needed",
    selectOpts: [
      { value: "ASAP", name: "ASAP" },
      { value: "Soon", name: "Soon" },
    ],
  },
];

export const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    item: "",
    size: "",
    quantity: "",
    price: "",
    totalAmount: "",
    depositAmount: "",
    deliveredItems: "",
    vendor: "",
    date: "",
    substituteVendor: "",
    needed: "",
  });

  const handleChange = (e) => {
    console.log(e);
    if (e.target) {
      console.log(e.target.value);
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage("Employee added successfully!");
    setIsError(true);
    console.log(values);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-foreground h-full w-full p-4 flex flex-col justify-between rounded"
    >
      <div className="grid grid-cols-2 my-6 3xl:mb-52 mb-32">
        {inputFields.map((input) => {
          return input.id === "needed" ? (
            <SelectInput {...input} key={input.id} onChange={handleChange} />
          ) : input.id === "vendor" ? (
            <SelectInput {...input} key={input.id} onChange={handleChange} />
          ) : input.id === "substitute vendor" ? (
            <SelectInput {...input} key={input.id} onChange={handleChange} />
          ) : (
            <FormInput
              key={input.id}
              {...input}
              onChange={handleChange}
              className={"my-3"}
            />
          );
        })}
      </div>
      <Button icon={MdOutlinePlaylistAdd} className={"w-48 m-0"}>
        Submit Request
      </Button>
      <Modal
        isOpen={showModal}
        setShowModal={setShowModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </form>
  );
};
