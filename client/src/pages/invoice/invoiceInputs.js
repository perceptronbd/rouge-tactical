export const invoiceInputs = [
  {
    id: "date",
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Date",
    required: true,
  },
  {
    id: "invoiceNumber",
    name: "invoiceNumber",
    label: "Invoice Number",
    type: "text",
    placeholder: "Invoice Number",
    required: true,
  },
  {
    id: "vendor",
    name: "vendor",
    label: "Vendor",
    defaultValue: "Select Vendor",
    selectOpts: [],
    required: true,
  },
  {
    id: "item",
    name: "item",
    label: "Item",
    type: "text",
    placeholder: "Item",
    required: true,
  },
  {
    id: "quantity",
    name: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "Quantity",
    required: true,
  },
  {
    id: "totalAmount",
    name: "totalAmount",
    label: "Total Amount",
    type: "text",
    placeholder: "Total Amount",
    required: true,
  },
  {
    id: "depositedAmount",
    name: "depositedAmount",
    label: "Deposited Amount",
    type: "text",
    placeholder: "Deposited Amount",
    required: true,
  },
  {
    id: "status",
    name: "status",
    label: "Status",
    selectOpts: [
      { value: "open", name: "Open" },
      { value: "close", name: "Close" },
    ],
    required: true,
  },
  {
    id: "updatedAt",
    name: "updatedAt",
    label: "Updated At",
    type: "date",
    placeholder: "Updated At",
    required: true,
  },
];
