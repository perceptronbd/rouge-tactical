import React from "react";
import { FormInput, Button } from "../../components";

export const Login = () => {
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
    console.log();
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
          className="w-40 rounded"
        />
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} />
          ))}
          <Button variant={"ghost"} className={"w-full"}>
            Login
          </Button>
        </form>
      </section>
    </>
  );
};
