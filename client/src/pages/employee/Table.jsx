import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { SearchInput, Text } from "../../components";
import { useNavigate } from "react-router-dom";

export const Table = ({ data }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const editUser = (e) => {
    console.log(e.target.value);
    navigate("/employee/edit");
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg">
          <div className="flex justify-between mb-2">
            <Text variant={"h3"}>Employee Information</Text>
            <SearchInput value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="max-h-[230px] 3xl:max-h-[500px] overflow-y-auto rounded-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className=" text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Name
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Position
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Email
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Phone
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Date of Birth
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Emergency Contact
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Start Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    End Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4  font-medium whitespace-nowrap text-left">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
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
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item["date of birth"]}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm flex flex-col gap-1">
                        <span>{item.emergencyContact.name}</span>
                        <span>{item.emergencyContact.phone}</span>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.startDate}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.endDate}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-foreground hover:text-accent-secondary transition-all ease-in-out duration-300">
                        <button onClick={editUser}>
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
