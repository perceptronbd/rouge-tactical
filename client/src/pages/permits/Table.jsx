import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { SearchInput, Text } from "../../components";

export const Table = ({ data, loading, setShowForm, setPermitDetails }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const checkDeadline = (deadline) => {
    const currentDate = Date.now();
    const deadlineDate = new Date(deadline);
    const daysDifference = Math.floor(
      (deadlineDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    console.log(daysDifference);

    if (daysDifference <= 60) {
      return true;
    } else {
      return false;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    console.log(item);
    setShowForm(true);
    setPermitDetails(item);
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg bg-accent-tertiary-light">
          <div className="flex justify-end p-2">
            <SearchInput value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="max-h-[550px] 3xl:max-h-[890px] overflow-y-auto rounded-b-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Permit
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Form
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Renewal Process
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Renewal Duration
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Renewal Deadline
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Contact Info
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Notes
                  </th>

                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="9">
                      <div className="font-bold text-xl text-foreground my-8 opacity-80">
                        No Data
                      </div>
                    </td>
                  </tr>
                ) : loading ? (
                  <tr className="text-center">
                    <td colSpan="9">
                      <div className="font-bold text-xl text-foreground my-8 opacity-80">
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) =>
                    checkDeadline(item.renewalDeadline) ? (
                      <tr
                        key={index}
                        className={`border-b-2 border-foreground bg-accent-secondary hover:bg-opacity-80 transition-all ease-in-out duration-300`}
                      >
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.permit}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.form}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalProcess}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalDuration}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalDeadline}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.contactInfo}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.notes}
                        </td>

                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          <button onClick={() => handleEdit(item)}>
                            <BiSolidMessageSquareEdit size={"1.5rem"} />
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={index}
                        className={`border-b-2 border-foreground bg-accent-tertiary-light hover:bg-accent-tertiary-hover transition-all ease-in-out duration-300`}
                      >
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.permit}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.form}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalProcess}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalDuration}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.renewalDeadline}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.contactInfo}
                        </td>
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          {item.notes}
                        </td>

                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          <button onClick={() => handleEdit(item)}>
                            <BiSolidMessageSquareEdit size={"1.5rem"} />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </article>
      ) : (
        <div className="flex w-full h-full justify-center items-center bg-foreground rounded-lg">
          <Text h1 className={"text-textColor-light"}>
            No Such Data
          </Text>
        </div>
      )}
    </>
  );
};
