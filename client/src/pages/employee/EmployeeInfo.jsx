import React, { useState } from "react";
import { Container, ContentModal, Form, UpdateForm } from "../../components";
import { UserInfo } from "./UserInfo";
import { Table } from "./Table";
import { OnboardingDoc } from "./OnboardingDoc";
import { employeeInfoInputs } from "./employeeInfoInputs";
import { useModal } from "../../hooks";

const userInfo = {
  name: "Atifulislam Asif",
  position: "Software Engineer",
  role: "admin",
  workEmail: "asifVudi@gmail.com",
  personalEmail: "atif@gmail.com",
  preferredEmail: "asifVudi@gmail.com",
  phone: "1234567890",
  DOB: "1990/01/01",
  emergencyContact: {
    name: "John Doe",
    phone: "1234567890",
  },
  startDate: "2021/01/01",
  endDate: "2021/01/01",
};

const usersData = [
  {
    name: "Atifulislam Asif",
    position: "Software Engineer",
    workEmail: "asif@gmail.com",
    personalEmail: "vudi@gmail.com",
    preferredEmail: "asif@gmail.com",
    phone: "1234567890",
    DOB: "1990/01/01",
    emergencyContact: {
      name: "John Doe",
      phone: "1234567890",
    },
    startDate: "2021/01/01",
    endDate: "2021/01/01",
    onboardingComplete: true,
    onboardingDocs: [
      { id: 1, label: "Non Disclosure Agreement (NDA)" },
      { id: 2, label: "New Employee Information Sheet" },
      { id: 3, label: "Request for Live Scan Service" },
      { id: 4, label: "Certificate fo Eligibility Information" },
      { id: 5, label: "Certificate fo Eligibility Application" },
      { id: 6, label: "Live Scan Locations" },
      { id: 7, label: "Live Scan Locations" },
      { id: 8, label: "Live Scan Locations" },
    ],
  },
  {
    name: "John Doe",
    position: "Frontend Developer",
    email: "john@gmail.com",
    phone: "9876543210",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Jane Smith",
      phone: "9876543210",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: false,
  },
  {
    name: "Jane Smith",
    position: "Backend Developer",
    email: "jane@gmail.com",
    phone: "5555555555",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "James Brown",
      phone: "5555555555",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
    onboardingDocs: [
      { id: 1, label: "Non Disclosure Agreement (NDA)" },
      { id: 2, label: "New Employee Information Sheet" },
      { id: 3, label: "Request for Live Scan Service" },
      { id: 4, label: "Certificate fo Eligibility Information" },
      { id: 5, label: "Certificate fo Eligibility Application" },
    ],
  },
  {
    name: "Alice Johnson",
    position: "Data Scientist",
    email: "alice@gmail.com",
    phone: "1231231234",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Bob Smith",
      phone: "1231231234",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
  },
  {
    name: "Eva Williams",
    position: "UI/UX Designer",
    email: "eva@gmail.com",
    phone: "9879879876",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "David Lee",
      phone: "9879879876",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: false,
  },
  {
    name: "Michael Brown",
    position: "Product Manager",
    email: "michael@gmail.com",
    phone: "7777777777",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Emily White",
      phone: "7777777777",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
  },
  {
    name: "Sarah Davis",
    position: "QA Tester",
    email: "sarah@gmail.com",
    phone: "1111111111",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Chris Miller",
      phone: "1111111111",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
    onboardingDocs: [
      { id: 1, label: "Non Disclosure Agreement (NDA)" },
      { id: 2, label: "New Employee Information Sheet" },
      { id: 3, label: "Request for Live Scan Service" },
      { id: 4, label: "Certificate fo Eligibility Information" },
      { id: 5, label: "Certificate fo Eligibility Application" },
    ],
  },
  {
    name: "Daniel Wilson",
    position: "System Administrator",
    email: "daniel@gmail.com",
    phone: "9999999999",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Olivia Adams",
      phone: "9999999999",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: false,
  },
  {
    name: "Sophia Thomas",
    position: "Marketing Manager",
    email: "sophia@gmail.com",
    phone: "8888888888",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "William Brown",
      phone: "8888888888",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
  },
  {
    name: "Liam Harris",
    position: "Financial Analyst",
    email: "liam@gmail.com",
    phone: "6666666666",
    DOB: "1985/01/02",
    emergencyContact: {
      name: "Emma Johnson",
      phone: "6666666666",
    },
    startDate: "2020/03/15",
    endDate: "2024/07/14",
    onboardingComplete: true,
    onboardingDocs: [
      { id: 1, label: "Non Disclosure Agreement (NDA)" },
      { id: 2, label: "New Employee Information Sheet" },
      { id: 3, label: "Request for Live Scan Service" },
      { id: 4, label: "Certificate fo Eligibility Information" },
      { id: 5, label: "Certificate fo Eligibility Application" },
    ],
  },
];

export const EmployeeInfo = () => {
  const { showModal, openModal, closeModal } = useModal();

  //  const [showModal, setShowModal] = useState(false);
  //const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [onboardingDocs] = useState([
    { id: 1, label: "Non Disclosure Agreement (NDA)" },
    { id: 2, label: "New Employee Information Sheet" },
    { id: 3, label: "Request for Live Scan Service" },
    { id: 4, label: "Certificate fo Eligibility Information" },
    { id: 5, label: "Certificate fo Eligibility Application" },
    { id: 6, label: "Live Scan Locations" },
    { id: 7, label: "Live Scan Locations" },
    { id: 8, label: "Live Scan Locations" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedEmployeeData = { ...employeeData };

    // Split the name into nested property parts
    const propertyPath = name.split(".");

    console.log(propertyPath);

    // If it's a nested property, update it accordingly
    if (propertyPath.length === 2) {
      updatedEmployeeData[propertyPath[0]] = {
        ...updatedEmployeeData[propertyPath[0]],
        [propertyPath[1]]: value,
      };
    } else {
      updatedEmployeeData[name] = value;
    }

    setEmployeeData(updatedEmployeeData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(employeeData);
  };

  return (
    <Container className={"flex-col justify-start items-start"}>
      <UserInfo data={userInfo} />

      {userInfo.role === "admin" && (
        <section className="w-full">
          <Table
            data={usersData}
            setEmployeeInfo={setEmployeeData}
            openForm={openModal}
            openAddForm={openModal}
          />
          <ContentModal isOpen={showModal} closeModal={closeModal}>
            <Form
              formTitle={"Add Employee"}
              inputFields={employeeInfoInputs}
              handleChange={handleChange}
              onSubmit={onSubmit}
            />
          </ContentModal>

          <ContentModal isOpen={showModal} closeModal={closeModal}>
            <UpdateForm
              formTitle={"Update Employee Info"}
              inputFields={employeeInfoInputs}
              data={employeeData}
              handleChange={handleChange}
              onSubmit={onSubmit}
            />
          </ContentModal>
        </section>
      )}
      <OnboardingDoc data={onboardingDocs} />
    </Container>
  );
};
