import React, { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import {
  Button,
  Container,
  FormInput,
  Modal,
  SelectInput,
  Text,
} from "../../components";
import { useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    phone: "",
    workEmail: "",
    personalEmail: "",
    password: "",
    address: "",
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
    setShowModal(true);
    setModalMessage("Employee added successfully!");
    setIsError(true);
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
            Add Employee
          </Text>
          <Button onClick={goBack} icon={BiArrowBack} className={"w-fit"}>
            Back
          </Button>
        </section>
        <div className="grid grid-cols-2 my-3 3xl:mb-52 mb-20">
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
        <Button icon={BsPersonFillAdd} className={"w-48 m-0"}>
          Add Employee
        </Button>
        <Modal
          isOpen={showModal}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          isError={isError}
        />
      </form>
    </Container>
  );
};
