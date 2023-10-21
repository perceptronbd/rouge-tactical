import { maintenanceData } from "../../mock/maintenance";

export const adminFormInputs = [
  {
    id: "machine",
    label: "Machine",
    name: "machine",
    defaultValue: "Select a machine",
    selectOpts: maintenanceData,
  },
  {
    id: "notify admin",
    label: "Notify Admin",
    name: "notifyAdmin",
    defaultValue: "Select an admin",
    selectOpts: [
      { value: "john", name: "John" },
      { value: "rachel", name: "Rachel" },
      { value: "janai", name: "Janai" },
      { value: "asif", name: "Asif" },
    ],
  },
];
