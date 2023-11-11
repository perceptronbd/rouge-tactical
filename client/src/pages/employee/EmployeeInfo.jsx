import React, { useEffect, useState } from "react";
import {
  Container,
  ContentModal,
  Form,
  Modal,
  UpdateForm,
} from "../../components";
import { UserInfo } from "./UserInfo";
import { Table } from "./Table";
import { OnboardingDoc } from "./OnboardingDoc";
import { employeeInfoInputs } from "./employeeInfoInputs";
import { useModal } from "../../hooks";
import { createUser, getAllUsers } from "../../api/admin/user";
import { useAuth } from "../../contexts/AuthContext";

const DEFAULT_PASSWORD = "RT12345!";

export const EmployeeInfo = () => {
  const { user } = useAuth();

  const [employeeData, setEmployeeData] = useState({});
  const [allExistingUsers, setAllExistingUsers] = useState([]);

  const { showModal, openModal, closeModal } = useModal();
  const {
    showModal: showAddForm,
    openModal: openAddForm,
    closeModal: closeAddForm,
  } = useModal();
  const {
    showModal: showUpdateForm,
    openModal: openUpdateForm,
    closeModal: closeUpdateForm,
  } = useModal();

  const onboardingDocs = [
    { id: 1, label: "Non Disclosure Agreement (NDA)" },
    { id: 2, label: "New Employee Information Sheet" },
    { id: 3, label: "Request for Live Scan Service" },
    { id: 4, label: "Certificate fo Eligibility Information" },
    { id: 5, label: "Certificate fo Eligibility Application" },
    { id: 6, label: "Live Scan Locations" },
    { id: 7, label: "Live Scan Locations" },
    { id: 8, label: "Live Scan Locations" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedEmployeeData = { ...employeeData };
    const propertyPath = name.split(".");

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!employeeData.password) {
      employeeData.password = DEFAULT_PASSWORD;
    }

    try {
      createUser(employeeData)
        .then((res) => {
          if (res.status === 500) {
            openModal("Something went wrong. Please try again later.", true);
          } else if (res.status === 400) {
            openModal("User with the same email already exists.", true);
          } else if (res.status === 200) {
            openModal("Employee added successfully.", false);
            closeAddForm();
            fetchAllUsers();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllUsers = () => {
    getAllUsers()
      .then((res) => {
        setAllExistingUsers(res.data.allUserProfileData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Container className="flex-col justify-start items-start">
      <UserInfo data={user} />

      {user.role === "admin" && (
        <section className="w-full">
          <Table
            data={allExistingUsers}
            setEmployeeInfo={setEmployeeData}
            openUpdateForm={openUpdateForm}
            openAddForm={openAddForm}
          />
          <ContentModal isOpen={showAddForm} closeModal={closeAddForm}>
            <Form
              formTitle="Add Employee"
              inputFields={employeeInfoInputs}
              handleChange={handleChange}
              onSubmit={handleFormSubmit}
            />
          </ContentModal>

          <ContentModal isOpen={showUpdateForm} closeModal={closeUpdateForm}>
            <UpdateForm
              formTitle="Update Employee Info"
              inputFields={employeeInfoInputs}
              data={employeeData}
              handleChange={handleChange}
              onSubmit={handleFormSubmit}
            />
          </ContentModal>
        </section>
      )}
      <OnboardingDoc data={onboardingDocs} />
    </Container>
  );
};
