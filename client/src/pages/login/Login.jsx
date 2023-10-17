import React, { useState } from "react";
import { FormInput, Button, LinkText, Modal } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { loginAPI } from "../../api/auth/login";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const { login } = useAuth();

  const inputs = [
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(values.email, values.password);

      if (response.code === 200) {
        login(response);
      } else {
        setIsError(true);
        setErrMsg(response.error);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.value);
  };

  return (
    <>
      <section
        className={
          "bg-foreground h-[98vh] flex flex-col gap-5 justify-center items-center rounded-md p-4 m-auto"
        }
      >
        <img
          src="/assets/logo.svg"
          alt="Rouge Tactical"
          className="w-72 rounded"
        />
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} onChange={handleChange} />
          ))}
          <LinkText to={"/forgot-password"}>Forgot password?</LinkText>
          <Button variant={"ghost"} className={"w-full"}>
            Login
          </Button>
          <Modal
            isOpen={showModal}
            setShowModal={setShowModal}
            isError={isError}
            modalMessage={errMsg}
          ></Modal>
        </form>
      </section>
    </>
  );
};
