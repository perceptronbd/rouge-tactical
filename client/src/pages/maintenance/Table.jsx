import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { SearchInput, Text } from "../../components";
import { cw } from "../../utils";

export const Table = ({
  data,
  loading,
  setShowForm,
  setMaintenanceDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const checkNextMaintenanceDate = (
    lastMaintenanceDate,
    maintenanceInterval
  ) => {
    const lastMaintained = new Date(lastMaintenanceDate);
    // Calculate the next maintenance date by adding the maintenance interval in days
    const nextMaintenanceDate = new Date(
      lastMaintained.getTime() + maintenanceInterval * 24 * 60 * 60 * 1000
    );
    // Format the next maintenance date as a string (e.g., "YYYY-MM-DD")
    const formattedNextMaintenanceDate = nextMaintenanceDate
      .toISOString()
      .split("T")[0];

    return formattedNextMaintenanceDate;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    console.log(item);
    setShowForm(true);
    setMaintenanceDetails(item);
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
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Machine
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Condition
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Location
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Assigned to
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace text-center">
                    Last Maintenance
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace text-center">
                    Maintenance Interval
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace text-center">
                    Next Maintenance
                  </th>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Notes
                  </th>

                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-right">
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
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b-2  bg-foreground text-textColor hover:bg-background transition-all ease-in-out duration-300`}
                    >
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.machine}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <div
                          className={cw(`w-16 text-white rounded-md `, {
                            "bg-green-500": item.condition === "Good",
                            "bg-yellow-500": item.condition === "Fair",
                            "bg-orange-500": item.condition === "Poor",
                            "bg-red-500": item.condition === "Bad",
                          })}
                        >
                          {item.condition}
                        </div>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {<item className="location"> {item.location}</item>}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.assignedTo}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.lastMaintenanceDate}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.maintenanceInterval}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {checkNextMaintenanceDate(
                          item.lastMaintenanceDate,
                          item.maintenanceInterval
                        )}
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.notes}
                      </td>

                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-red-500 hover:text-red-300"
                        >
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
            No Such Data
          </Text>
        </div>
      )}
    </>
  );
};
