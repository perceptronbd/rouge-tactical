import React, { useState } from "react";
import {
  BiCheckbox,
  BiSolidCheckboxChecked,
  BiSolidMessageSquareEdit,
} from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { Button, SearchInput, Text } from "../../components";
import { cw, formatDate } from "../../utils";

export const Table = ({
  data,
  openUpdateForm,
  setEmployeeInfo,
  openAddForm,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    console.log("employee info:", item);
    openUpdateForm();
    setEmployeeInfo(item);
  };

  // const handleRowClick = (index, item) => {
  //   // Toggle the selected row and its onboarding status
  //   setSelectedRowIndex(index);
  //   const updatedItem = {
  //     ...item,
  //     onboardingComplete: !item.onboardingComplete,
  //   };
  //   const updatedData = [...data];
  //   updatedData[index] = updatedItem;
  //   console.log(updatedData, updatedItem);
  //   setOnboardingDocs(item.onboardingDocs);
  // };

  const addUser = () => {
    openAddForm();
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg">
          <div className="flex justify-between mb-2">
            <Text variant={"h3"}>Employee Information</Text>
            <div className="flex gap-4 h-10">
              <Button
                icon={BsPersonFillAdd}
                variant={"ghost"}
                className={"m-0 w-10"}
                onClick={addUser}
              />
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <div className="max-h-[230px] 3xl:max-h-[500px] overflow-y-auto rounded-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="rt-sm:text-xs text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Name
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-center">
                    Position
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Email
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Phone
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-center">
                    Date of Birth
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium  text-center">
                    Emergency Contact
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium text-center">
                    Start Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium  text-center">
                    End Date
                  </th>
                  <th className="px-4 py-4 3xl:p-4 w-8 font-medium  text-center">
                    Onboarding Complete
                  </th>
                  <th className="px-4 py-4 3xl:p-4  font-medium whitespace-nowrap text-right">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="text-white rt-sm:text-xs">
                {filteredData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="9">
                      <div className="font-bold text-xl text-foreground my-8 opacity-80">
                        No Data
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={cw(
                        `border-b-2 cursor-pointer ${"bg-accent-tertiary-light"} ${"text-foreground"} hover:bg-opacity-70 transition-all ease-in-out duration-300`
                      )}
                    >
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.name}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.position}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.preferredEmail}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.phone}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm rt-sm:w-20 whitespace-nowrap">
                        {formatDate(item.DOB)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm flex flex-col gap-1">
                        <span>{item.emergencyContact.name}</span>
                        <span>{item.emergencyContact.phone}</span>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm whitespace-nowrap">
                        {formatDate(item.startDate)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm whitespace-nowrap">
                        {formatDate(item.endDate)}
                      </td>

                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-center text-foreground transition-all ease-in-out duration-300">
                        <div className=" flex justify-center items-center text-2xl">
                          {item.onboardingComplete ? (
                            <BiSolidCheckboxChecked />
                          ) : (
                            <BiCheckbox />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-right text-foreground hover:text-accent-secondary transition-all ease-in-out duration-300">
                        <button onClick={() => handleEdit(item)}>
                          <BiSolidMessageSquareEdit size={"1.5rem"} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      ) : (
        <div className="flex w-full h-full justify-center items-center bg-foreground rounded-lg">
          <Text h1 className={"text-textColor-light"}>
            No Data to Show
          </Text>
        </div>
      )}
    </>
  );
};
