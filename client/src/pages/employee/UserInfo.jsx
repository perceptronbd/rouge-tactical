import React from "react";
import { CiUser } from "react-icons/ci";
import { Text } from "../../components";

const userInfo = {
  name: "Atifulislam Asif",
  position: "Software Engineer",
  email: "asif@gmail.com",
  phone: "1234567890",
  DOB: "01/01/1990",
  emergencyContact: {
    name: "John Doe",
    phone: "1234567890",
  },
  startDate: "01/01/2021",
  endDate: "01/01/2021",
};

export const UserInfo = () => {
  return (
    <article className="w-fit h-42 flex gap-8 border rounded p-3">
      <div className="bg-accent-secondary w-32 h-32  flex font-thin justify-center items-center rounded">
        <CiUser size={"6rem"} className="text-accent-primary" />
      </div>
      <section className="h-full flex gap-4">
        <div>
          <Text className={"text-textColor-light"}>Name</Text>
          <Text className={"text-textColor-light"}>Position</Text>
          <Text className={"text-textColor-light"}>E-mail</Text>
          <Text className={"text-textColor-light"}>Phone</Text>
          <Text className={"text-textColor-light"}>Date of Birth</Text>
        </div>
        <div>
          <Text className={"text-textColor-light"}>:</Text>
          <Text className={"text-textColor-light"}>:</Text>
          <Text className={"text-textColor-light"}>:</Text>
          <Text className={"text-textColor-light"}>:</Text>
          <Text className={"text-textColor-light"}>:</Text>
        </div>
        <div>
          <Text>{userInfo.name}</Text>
          <Text className={"text-accent-secondary rounded-full"} type={"bold"}>
            {userInfo.position}
          </Text>
          <Text>{userInfo.email}</Text>
          <Text>{userInfo.phone}</Text>
          <Text>{userInfo.DOB}</Text>
        </div>
      </section>
      <div className="h-full flex flex-col justify-between">
        <section
          className="relative w-64 h-fit flex gap-2 border rounded p-2"
          id="emergencyContact"
        >
          <label
            htmlFor="emergencyContact"
            className="absolute -top-2.5 left-1 text-xs bg-background px-1 rounded-md"
          >
            Emergency Contact
          </label>
          <div>
            <Text className={"text-textColor-light"}>Name</Text>
            <Text className={"text-textColor-light"}>Phone</Text>
          </div>
          <div>
            <Text className={"text-textColor-light"}>:</Text>
            <Text className={"text-textColor-light"}>:</Text>
          </div>
          <div>
            <Text>{userInfo.emergencyContact.name}</Text>
            <Text>{userInfo.emergencyContact.phone}</Text>
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <div className="bg-red-100 p-0.5 text-center rounded">
            <Text type={"bold"} className={"text-red-800"}>
              Start Date : {userInfo.startDate}
            </Text>
          </div>
          <div className="bg-green-100 p-0.5 text-center rounded">
            <Text type={"bold"} className={"text-green-800"}>
              End Date : {userInfo.endDate}
            </Text>
          </div>
        </section>
      </div>
    </article>
  );
};
