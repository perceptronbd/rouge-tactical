import React, { useEffect, useState } from "react";
import {
  Container,
  ContentModal,
  Form,
  LoaderCard,
  UpdateForm,
} from "../../components";
import { UserInfo } from "./UserInfo";
import { Table } from "./Table";
import { OnboardingDoc } from "./OnboardingDoc";
import { employeeInfoInputs } from "./employeeInfoInputs";
import { useAuth } from "../../contexts/AuthContext";
import { isRoleAdmin } from "../../api/utils/isRoleAdmin";

const usersData = [
  {
    name: "Atifulislam Asif",
    position: "Software Engineer",
    email: "asif@gmail.com",
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
    startDate: "03/15/2020",
    endDate: "11/02/2023",
    onboardingComplete: false,
  },
  {
    name: "Jane Smith",
    position: "Backend Developer",
    email: "jane@gmail.com",
    phone: "5555555555",
    DOB: "07/20/1992",
    emergencyContact: {
      name: "James Brown",
      phone: "5555555555",
    },
    startDate: "11/01/2018",
    endDate: "11/02/2023",
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
    DOB: "05/10/1988",
    emergencyContact: {
      name: "Bob Smith",
      phone: "1231231234",
    },
    startDate: "07/01/2019",
    endDate: "11/02/2023",
    onboardingComplete: true,
  },
  {
    name: "Eva Williams",
    position: "UI/UX Designer",
    email: "eva@gmail.com",
    phone: "9879879876",
    DOB: "12/30/1987",
    emergencyContact: {
      name: "David Lee",
      phone: "9879879876",
    },
    startDate: "09/15/2020",
    endDate: "11/02/2023",
    onboardingComplete: false,
  },
  {
    name: "Michael Brown",
    position: "Product Manager",
    email: "michael@gmail.com",
    phone: "7777777777",
    DOB: "03/05/1980",
    emergencyContact: {
      name: "Emily White",
      phone: "7777777777",
    },
    startDate: "02/01/2017",
    endDate: "11/02/2023",
    onboardingComplete: true,
  },
  {
    name: "Sarah Davis",
    position: "QA Tester",
    email: "sarah@gmail.com",
    phone: "1111111111",
    DOB: "09/25/1995",
    emergencyContact: {
      name: "Chris Miller",
      phone: "1111111111",
    },
    startDate: "06/01/2022",
    endDate: "11/02/2023",
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
    DOB: "04/12/1983",
    emergencyContact: {
      name: "Olivia Adams",
      phone: "9999999999",
    },
    startDate: "10/15/2016",
    endDate: "11/02/2023",
    onboardingComplete: false,
  },
  {
    name: "Sophia Thomas",
    position: "Marketing Manager",
    email: "sophia@gmail.com",
    phone: "8888888888",
    DOB: "08/08/1990",
    emergencyContact: {
      name: "William Brown",
      phone: "8888888888",
    },
    startDate: "04/01/2019",
    endDate: "11/02/2023",
    onboardingComplete: true,
  },
  {
    name: "Liam Harris",
    position: "Financial Analyst",
    email: "liam@gmail.com",
    phone: "6666666666",
    DOB: "11/18/1991",
    emergencyContact: {
      name: "Emma Johnson",
      phone: "6666666666",
    },
    startDate: "12/01/2020",
    endDate: "11/02/2023",
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
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [onboardingDocs, setOnboardingDocs] = useState([]);

  useEffect(() => {
    isRoleAdmin(setLoading, setIsAdmin);
  }, []);

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
      <UserInfo data={user} />

      {loading ? (
        <LoaderCard />
      ) : (
        isAdmin && (
          <section className="w-full">
            <Table
              data={usersData}
              setEmployeeInfo={setEmployeeData}
              setShowForm={setShowModal}
              setShowAddForm={setShowForm}
              setOnboardingDocs={setOnboardingDocs}
            />
            <ContentModal isOpen={showForm} setShowModal={setShowForm}>
              <Form
                formTitle={"Add Employee"}
                inputFields={employeeInfoInputs}
                handleChange={handleChange}
                onSubmit={onSubmit}
              />
            </ContentModal>

            <ContentModal isOpen={showModal} setShowModal={setShowModal}>
              <UpdateForm
                formTitle={"Update Employee Info"}
                inputFields={employeeInfoInputs}
                data={employeeData}
                handleChange={handleChange}
                onSubmit={onSubmit}
              />
            </ContentModal>
          </section>
        )
      )}
      <OnboardingDoc data={onboardingDocs} />
    </Container>
  );
};
