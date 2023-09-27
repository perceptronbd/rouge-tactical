import React, { useState } from "react";
import { FormInput, Button, LinkText } from "../../components";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$",
      errorMessage:
        "Password must be at least 8 characters long and contain 1 uppercase letter, 1 lowercase letter, and 1 number",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
        </form>
      </section>
    </>
  );
};
