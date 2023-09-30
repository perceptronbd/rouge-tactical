import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import {
  Button,
  Container,
  FormInput,
  SelectInput,
  Text,
} from "../../components";
import { useNavigate } from "react-router-dom";

const inputFields = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
    required: true,
    pattern: "[a-zA-Z ]{2,30}",
    errorMessage: "Please enter a valid name",
  },
  {
    id: "phone",
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Phone",
    required: true,
    pattern: "[0-9]{10}",
    errorMessage: "Please enter a valid phone number",
  },
  {
    id: "email",
    name: "email",
    label: "E-mail",
    type: "email",
    placeholder: "E-mail",
    required: true,
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    errorMessage: "Please enter a valid email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    required: true,
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
  },
  {
    id: "DOB",
    name: "DOB",
    label: "Date of Birth",
    type: "date",
    placeholder: "Date of Birth",
    required: true,
    pattern: "",
    errorMessage: "",
  },
  {
    id: "role",
    name: "role",
    label: "Role",
    selectOpts: [
      { value: "admin", name: "Admin" },
      { value: "employee", name: "Employee" },
    ],
  },
  {
    id: "position",
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "Position",
    required: true,
    pattern: "[a-zA-Z ]{2,30}",
    errorMessage: "Please enter a valid position",
  },
  {
    id: "emergencyContact",
    emergencyContact: [
      {
        id: "emergencyContactName",
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
        placeholder: "Emergency Contact Name",
        required: true,
        pattern: "[a-zA-Z ]{2,30}",
        errorMessage: "Please enter a valid name",
      },
      {
        id: "emergencyContactPhone",
        name: "emergencyContactPhone",
        label: "Emergency Contact Phone",
        type: "tel",
        placeholder: "Emergency Contact Phone",
        required: true,
        pattern: "[0-9]{10}",
        errorMessage: "Please enter a valid phone number",
      },
    ],
  },
  {
    id: "startDate",
    name: "startDate",
    label: "Start Date",
    type: "date",
    placeholder: "Start Date",
    required: true,
    pattern: "",
    errorMessage: "",
  },
  {
    id: "endDate",
    name: "endDate",
    label: "End Date",
    type: "date",
    placeholder: "End Date",
    required: true,
    pattern: "",
    errorMessage: "",
  },
];

export const EditEmployee = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    DOB: "",
    role: "",
    position: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <form
        onSubmit={onSubmit}
        className="h-full w-full flex flex-col justify-between"
      >
        <section className="flex h-10 justify-between items-center">
          <Text variant={"h3"} type={"bold"}>
            Edit Employee
          </Text>
          <Button onClick={goBack} icon={BiArrowBack} className={"w-fit"}>
            Back
          </Button>
        </section>
        <div className="grid grid-cols-2 my-6 3xl:mb-52 mb-32">
          {inputFields.map((input) => {
            return input.id === "role" ? (
              <SelectInput {...input} key={input.id} onChange={handleChange} />
            ) : input.id === "emergencyContact" ? (
              <div
                id="emergencyContact"
                className="border rounded px-3 py-1 w-fit"
              >
                {input.emergencyContact.map((contact) => (
                  <FormInput
                    key={contact.id}
                    {...contact}
                    onChange={handleChange}
                    className={"my-3"}
                  />
                ))}
              </div>
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
        <section className="flex gap-2">
          <Button icon={FaUserEdit} className={"w-48 m-0"}>
            Update
          </Button>
          <Button
            icon={MdDeleteOutline}
            className={"w-48 m-0"}
            variant={"danger"}
          >
            Delete
          </Button>
        </section>
      </form>
    </Container>
  );
};