import React from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { Text } from "../../components";

export const Table = ({ data, loading, setShowForm, setItemData }) => {
  const COLORS = ["#9F97F7", "#0088FE", "#00C49F", "#FFB44F"];

  const handleEdit = (item) => {
    console.log(item);
    setShowForm(true);
    setItemData(item);
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg bg-accent-tertiary-light">
          <div className="max-h-[260px] 3xl:max-h-[900px] overflow-y-auto rounded-b-lg rounded-t-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Batch
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Status
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Quantity
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Range
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Style
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Serial Number
                  </th>

                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Missing
                  </th>

                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-right">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {data.length === 0 ? (
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
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={` border-b-2 border-foreground bg-accent-tertiary-light hover:bg-accent-tertiary-hover transition-all ease-in-out duration-300`}
                    >
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.batch}
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-center w-32">
                        <div
                          className="text-white text-center font-medium rounded-md"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        >
                          {item.status}
                        </div>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.range.min} - {item.range.max}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.style}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.serialNumber}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.missing}
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-right">
                        <button onClick={() => handleEdit(item)}>
                          <BiSolidMessageSquareEdit size={"1.2rem"} />
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
