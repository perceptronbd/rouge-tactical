import React, { useEffect, useState } from "react";
import { SearchInput, Text } from "../../components";
import { cw } from "../../utils";

const Checkbox = (props) => {
  const { id, label, className, ...inputProps } = props;

  return (
    <>
      <div className={cw("py-1", className)}>
        <input
          className="peer appearance-none h-4 w-4 border-2 border-red-500 rounded bg-transparent checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id={id}
          {...inputProps}
        />
        <label
          className="inline-block peer-checked:text-green-500 text-red-500 font-semibold transition-all ease-in-out duration-300"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export const Table = ({ data, approved, role, handleApprove }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg">
          <div className="flex justify-between mb-2">
            <div className="flex gap-4 h-10">
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <div className="max-h-[560px] 3xl:max-h-[900px] overflow-y-auto rounded-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Item
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Size
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Quantity
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Price
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Delivered Items
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Substitute Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Needed
                  </th>
                  {role === "admin" && (
                    <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                      Approved
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="11">
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
                        {item.date}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.item}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.size}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.price}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.deliveredItems}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.vendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.substituteVendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.needed}
                      </td>
                      {role === "admin" && (
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          <Checkbox
                            id={item.id}
                            label={item.approved ? "Yes" : "No"}
                            checked={approved}
                            onClick={handleApprove}
                            className={
                              "bg-foreground flex justify-center items-center rounded-md"
                            }
                          />
                        </td>
                      )}
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
