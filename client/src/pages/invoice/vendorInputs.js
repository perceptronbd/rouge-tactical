export const vendorInputs = [
  {
    id: "name",
    name: "name",
    label: "Vendor",
    type: "text",
    placeholder: "Name",
    required: true,
    pattern: "[a-zA-Z ]{2,30}",
    errorMessage: "Please enter a valid name",
  },
  {
    id: "contact",
    name: "contact",
    label: "Contact",
    type: "text",
    placeholder: "Contact",
    required: true,
    pattern: "[a-zA-Z ]{2,30}",
    errorMessage: "Please enter a valid contact number",
  },
  {
    id: "phone",
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Phone",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    errorMessage: "Please enter a valid email",
  },
  {
    id: "address",
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Address",
    required: true,
  },
];
