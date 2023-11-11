import React, { useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Button, FormInput, Modal, SelectInput } from "../../components";
import { useModal } from "../../hooks";

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
    type: "number",
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
    id: "depositAmount",
    name: "depositAmount",
    label: "Deposit Amount",
    type: "number",
    placeholder: "Deposit Amount",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "totalAmount",
    name: "totalAmount",
    label: "Total Amount",
    type: "number",
    placeholder: "Total Amount",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "deliveredItems",
    name: "deliveredItems",
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
    defaultValue: "Select Vendor",
    selectOpts: [
      { value: "id-1", name: "Vendor 1" },
      { value: "id-2", name: "Vendor 2" },
      { value: "id-3", name: "Vendor 3" },
      { value: "id-4", name: "Vendor 4" },
      { value: "id-5", name: "Vendor 5" },
    ],
    required: true,
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
    id: "substituteVendor",
    name: "substituteVendor",
    label: "Substitute Vendor",
    defaultValue: "Select Substitue Vendor",
    selectOpts: [
      { value: "id-1", name: "Sub-Vendor 1" },
      { value: "id-2", name: "Sub-Vendor 2" },
      { value: "id-3", name: "Sub-Vendor 3" },
      { value: "id-4", name: "Sub-Vendor 4" },
      { value: "id-5", name: "Sub-Vendor 5" },
    ],
    required: true,
  },
  {
    id: "needed",
    name: "needed",
    label: "Needed",
    defaultValue: "Select",
    selectOpts: [
      { value: "Urgent", name: "Urgent" },
      { value: "Soon", name: "Soon" },
    ],
    required: true,
  },
];

export const Form = () => {
  const { showModal, isError, modalMessage, openModal, closeModal } =
    useModal();

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
    if (e.target) {
      const { name, value } = e.target;
      let updatedValues = { ...values, [name]: value };

      // Calculate totalAmount when quantity, price, or depositAmount changes
      if (name === "quantity" || name === "price" || name === "depositAmount") {
        const quantity = parseInt(updatedValues.quantity) || 0;
        const price = parseFloat(updatedValues.price) || 0;
        const depositAmount = parseFloat(updatedValues.depositAmount) || 0;

        updatedValues.totalamount = (quantity * price - depositAmount).toFixed(
          2
        );
      }

      setValues(updatedValues);
      console.log(updatedValues);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    openModal("Item Added Successfully!", false);
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
          ) : input.id === "substituteVendor" ? (
            <SelectInput {...input} key={input.id} onChange={handleChange} />
          ) : (
            <FormInput
              key={input.id}
              {...input}
              onChange={handleChange}
              className={"my-3"}
              value={
                input.name === "totalAmount"
                  ? values.totalamount
                  : values[input.name]
              }
            />
          );
        })}
      </div>

      <Button icon={MdOutlinePlaylistAdd} className={"w-48 m-0"}>
        Submit Request
      </Button>
      <Modal
        isOpen={showModal}
        closeModal={closeModal}
        modalMessage={modalMessage}
        isError={isError}
      />
    </form>
  );
};
