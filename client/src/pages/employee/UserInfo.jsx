import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Text } from "../../components";
import { formatDate } from "../../utils";
import { togglePreferredEmail } from "../../api/auth/profile";

export const UserInfo = ({ data }) => {
  const [email, setEmail] = useState(data.preferredEmail);
  const [loading, setLoading] = useState(false);

  const toggleEmail = () => {
    const token = sessionStorage.getItem("token");
    try {
      setLoading(true);
      togglePreferredEmail(token).then(
        (response) => {
          console.log(response.preferredEmail);
          setEmail(response.preferredEmail);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(true);
    if (email === data.personalEmail) {
      setEmail(data.workEmail);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setEmail(data.personalEmail);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <article className="w-fit h-42 flex gap-8 border rounded p-3">
      <div className="bg-accent-secondary w-32 h-32  flex font-thin justify-center items-center rounded">
        <CiUser size={"6rem"} className="text-accent-primary" />
      </div>
      <section className="h-full w-fit flex gap-4">
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
          <Text>{data.name}</Text>
          <Text className={"text-accent-secondary rounded-full"} type={"bold"}>
            {data.position}
          </Text>
          <button
            className="px-4 rounded-md w-52 bg-accent-tertiary text-white"
            onClick={() => {
              toggleEmail();
            }}
          >
            <>
              {loading ? (
                <span className="opacity-75">laoding...</span>
              ) : (
                <span>{email}</span>
              )}
            </>
          </button>
          <Text>{data.phone}</Text>
          <Text>{formatDate(data.DOB)}</Text>
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
            <Text>{data.emergencyContact.name}</Text>
            <Text>{data.emergencyContact.phone}</Text>
          </div>
        </section>
        <section className="flex flex-col gap-1">
          <div className="bg-green-100 p-0.5 text-center rounded">
            <Text type={"bold"} className={"text-green-800"}>
              Start Date : {formatDate(data.startDate)}
            </Text>
          </div>
          <div className="bg-red-100 p-0.5 text-center rounded">
            <Text type={"bold"} className={"text-red-800"}>
              End Date : {formatDate(data.endDate)}
            </Text>
          </div>
        </section>
      </div>
    </article>
  );
};
