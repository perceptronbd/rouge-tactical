import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../components";
import { formatDate } from "../../utils";

export const Table = ({
  data,
  loading,
  setPurchaseDetails,
  openPreview,
  vendorData,
}) => {
  console.log("data", data);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  let filteredData = [];

  if (Array.isArray(data)) {
    filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  } else {
    console.error("'data' is not an array.");
  }

  const showPurchasePreview = (item) => {
    openPreview();
    setPurchaseDetails(item);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    navigate("/purchase/update", { state: { item, vendorData } });
  };

  return (
    <>
      {
        <article className="rounded-lg bg-accent-tertiary-light">
          <div className="flex justify-end p-2">
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="max-h-[250px] 3xl:max-h-[500px] overflow-y-auto rounded-b-lg bg-accent-tertiary">
            <table className="w-full border-collapse rt-sm:text-xs">
              <thead className="text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-4 py-4 3xl:p-4 font-medium  text-left">
                    Date
                  </th>{" "}
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-left">
                    Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    PO #
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-left">
                    Items
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Quantity
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Total Amount
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Deposit Paid
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Total Remaining
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Status
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium  text-center">
                    Date Closed
                  </th>
                  <th className="px-4 py-4 3xl:p-4 font-medium  text-right">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="text-white ">
                {filteredData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="11">
                      <div className="flex justify-center items-center font-bold text-xl text-foreground my-8 opacity-80 h-[150px] 3xl:h-[300px]">
                        No Data
                      </div>
                    </td>
                  </tr>
                ) : loading ? (
                  <tr className="text-center">
                    <td colSpan="11">
                      <div className="flex justify-center items-center font-bold text-xl text-foreground my-8 opacity-80 h-[150px] 3xl:h-[300px]">
                        Loading...
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
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left text-sm whitespace-nowrap">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.vendorName}
                      </td>
                      <td className="px-1 pr-2 py-2 3xl:p-4 3xl:py-2 text-left">
                        <button
                          className="bg-accent-secondary rounded-md text-accent-primary w-full"
                          onClick={() => showPurchasePreview(item)}
                        >
                          {item.orderNumber}
                        </button>
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.items.map((item, index) => (
                          <span
                            className="flex flex-col"
                            key={index}
                          >
                            {item.item}
                          </span>
                        ))}
                      </td>

                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.items.map((item, index) => (
                          <span
                            className="flex flex-col"
                            key={index}
                          >
                            {item.unitCost}
                          </span>
                        ))}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.totalAmount}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.depositAmount}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.totalAmount - item.depositAmount}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.status === "close" ? "Closed" : "Open"}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center text-sm">
                        {item.status === "open"
                          ? "- - -"
                          : formatDate(item.updateAt)}
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-right">
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
      }
    </>
  );
};
