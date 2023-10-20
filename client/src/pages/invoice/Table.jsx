import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { SearchInput, Text } from "../../components";
import { formatDate } from "../../utils";

export const Table = ({ data, loading, setShowForm, setInvoiceDetails }) => {
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
    console.log(item);
    setShowForm(true);
    setInvoiceDetails(item);
  };

  return (
    <>
      {data ? (
        <article className="rounded-lg bg-accent-tertiary-light">
          <div className="flex justify-end p-2">
            <SearchInput value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="max-h-[250px] 3xl:max-h-[500px] overflow-y-auto rounded-b-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Date
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Invoice
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Item
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Quantity
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Total Amount
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Deposited Amount
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Status
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Closed At
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Edit
                  </th>
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
                ) : loading ? (
                  <tr className="text-center">
                    <td colSpan="11">
                      <div className="font-bold text-xl text-foreground my-8 opacity-80">
                        Loaging...
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b-2 border-foreground hover:bg-accent-tertiary-hover transition-all ease-in-out duration-300 ${
                        item.status === "close"
                          ? "bg-neutral-200 text-textColor-light hover:bg-neutral-100"
                          : "bg-accent-tertiary-light"
                      } `}
                    >
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left text-sm">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.invoiceNumber}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.vendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.item}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.totalAmount}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.depositedAmount}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.status}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm">
                        {item.updatedAt === "NaN-NaN-NaN"
                          ? "- - -"
                          : formatDate(item.updatedAt)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <button
                          disabled={item.status === "close"}
                          onClick={() => handleEdit(item)}
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
