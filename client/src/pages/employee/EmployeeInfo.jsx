import React from "react";
import { Container } from "../../components";
import { UserInfo } from "./UserInfo";

export const EmployeeInfo = () => {
  return (
    <Container className={"flex-col justify-start items-start"}>
      <UserInfo />
      <section>Table</section>
      <section>Onboarding Documents</section>
    </Container>
  );
};
