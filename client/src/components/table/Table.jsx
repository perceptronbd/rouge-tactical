import React, { useState } from "react";
import { Text } from "../texts/Text";
import { SearchInput } from "../inputs/SearchInput";

export const Table = ({ data }) => {
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
        <article className=" rounded-lg bg-foreground pt-4 pl-1 pb-1">
          <div className="flex justify-between items-center px-4">
            <Text h2>Stock Quantity</Text>
            <SearchInput value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="w-full max-h-[480px] 3xl:max-h-[780px] overflow-y-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead className="text-xs text-textColor-light uppercase border-b-2 border-background  bg-foreground  sticky top-0">
                <tr className="w-[900px]">
                  {Object.keys(data[0]).map((item, index) =>
                    item === "id" ? (
                      ""
                    ) : (
                      <th
                        className="p-4 font-medium whitespace-nowrap text-left"
                        key={index}
                      >
                        {item}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <div className="font-bold text-xl text-textColor-light my-8">
                    No Data
                  </div>
                ) : (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b-2 border-background font-semibold `}
                    >
                      {Object.keys(item).map((key, index) => {
                        if (key === "id") return "";
                        return (
                          <td className="p-4 text-left" key={index}>
                            {item[key]}
                          </td>
                        );
                      })}
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
