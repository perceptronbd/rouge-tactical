import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { Button, SearchInput, Text } from "../../components";
import { formatDate } from "../../utils";

export const Table = ({
  data,
  setShowForm,
  setEmployeeInfo,
  setShowAddForm,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
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
    setShowForm(true);
    setEmployeeInfo(item);
  };

  const addUser = () => {
    setShowAddForm(true);
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
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Name
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Position
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Work Email
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Phone
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Date of Birth
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium  text-left">
                    Emergency Contact
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium text-left">
                    Start Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium  text-left">
                    End Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
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
                      className={`border-b-2 border-foreground bg-accent-tertiary-light hover:bg-accent-tertiary-hover transition-all ease-in-out duration-300`}
                    >
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.name}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.position}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.email}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.phone}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm rt-sm:w-20 whitespace-nowrap">
                        {formatDate(item.DOB)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm flex flex-col gap-1">
                        <span>{item.emergencyContact.name}</span>
                        <span>{item.emergencyContact.phone}</span>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm whitespace-nowrap">
                        {formatDate(item.startDate)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm whitespace-nowrap">
                        {formatDate(item.endDate)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-foreground hover:text-accent-secondary transition-all ease-in-out duration-300">
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
