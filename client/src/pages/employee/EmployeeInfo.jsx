import React, { useEffect, useState } from "react";
import {
  Container,
  ContentModal,
  Form,
  LoaderCard,
  Modal,
  UpdateForm,
} from "../../components";
import { UserInfo } from "./UserInfo";
import { Table } from "./Table";
import { OnboardingDoc } from "./OnboardingDoc";
import { employeeInfoInputs } from "./employeeInfoInputs";
import { useAuth } from "../../contexts/AuthContext";
import { isRoleAdmin } from "../../api/utils/isRoleAdmin";
import { createUser, getAllUsers } from "../../api/admin/user";

export const EmployeeInfo = () => {
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [allExistingUsers, setAllExistingUsers] = useState([]);

  const [showMsg, setShowMsg] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [onboardingDocs, setOnboardingDocs] = useState([]);

  useEffect(() => {
    isRoleAdmin(setLoading, setIsAdmin).then(() => {
      getAllUsers().then((res) => {
        setAllExistingUsers(res.data.allUserProfileData);
      });
    });
  }, [isAdmin]);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (employeeData.password === null || employeeData.password === undefined) {
      employeeData.password = "RT12345!";
    }

    try {
      createUser(employeeData)
        .then((res) => {
          if (res.status === 500) {
            setIsError(true);
            setModalMsg("Something went wrong. Please try again later.");
            setShowMsg(true);
            console.log(res.data.message);
          } else if (res.status === 400) {
            setIsError(true);
            setModalMsg("User with the same email already exists.");
            setShowMsg(true);
          } else if (res.code === 200) {
            setIsError(false);
            setModalMsg("Employee added successfully.");
            setShowMsg(true);
            setShowForm(false);
            getAllUsers().then((res) => {
              setAllExistingUsers(res.data.allUserProfileData);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
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
              data={allExistingUsers}
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
            <Modal
              isOpen={showMsg}
              setShowModal={setShowMsg}
              modalMessage={modalMsg}
              isError={isError}
            />
          </section>
        )
      )}
      <OnboardingDoc data={onboardingDocs} />
    </Container>
  );
};
