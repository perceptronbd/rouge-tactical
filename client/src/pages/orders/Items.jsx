import React, { useState } from "react";
import {
  BiSolidMessageSquareEdit,
  BiSolidCheckboxChecked,
  BiCheckbox,
} from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { historyData as initialData } from "../../mock/history";
import { Button, SearchInput, Text } from "../../components";
import { cw, formatDate } from "../../utils";

export const Table = ({
  data,
  handleRequest,
  handleNeededToggle,
  handleEdit,
  handleQuantityEdit,
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

  return (
    <>
      {data ? (
        <article className="rounded-lg">
          <div className="flex justify-between">
            <div className="flex gap-4 h-10 mb-2">
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <div className="max-h-[500px] 3xl:max-h-[830px] overflow-y-auto rounded-lg bg-accent-tertiary">
            <table className="w-full border-collapse rt-sm:text-xs">
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

                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Substitute Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Needed
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Request
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredData.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="12">
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
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left rt-sm:w-20">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.item}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.size}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 flex items-center justify-center 3xl:gap-1">
                        {item.isEditing ? (
                          <input
                            type="text"
                            className="border rounded-md p-1 w-10 text-center text-black"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityEdit(item.id, e.target.value)
                            }
                          />
                        ) : (
                          item.quantity
                        )}
                        <Button
                          onClick={() => handleEdit(item.id)}
                          icon={BiSolidMessageSquareEdit}
                          className={"w-4 h-4 bg-transparent"}
                        />
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.price}
                      </td>

                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.vendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.substituteVendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left transition-all ease-in-out duration-300">
                        <div
                          className={cw(
                            ` bg-foreground font-semibold rounded-md px-2 py-1 text-center cursor-pointer`,
                            item.needed === "Urgent"
                              ? "text-red-500"
                              : "text-yellow-500"
                          )}
                          onClick={() => handleNeededToggle(item.id)}
                        >
                          {item.needed}
                        </div>
                      </td>

                      <td className="px-6 py-4 3xl:p-4 3xl:py-2">
                        <div
                          className=" flex justify-center items-center text-2xl"
                          onClick={() => handleRequest(item.id)}
                        >
                          {item.requested ? (
                            <BiSolidCheckboxChecked />
                          ) : (
                            <BiCheckbox />
                          )}
                        </div>
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

export const Items = () => {
  const [data, setData] = useState(initialData);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
    setUpdatedItems((prevItems) => [...prevItems, id]);
  };

  const handleApprove = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, approved: !item.approved } : item
    );

    setIsDataUpdated(true);
    setData(updatedData);
    setUpdatedItems((prevItems) => [...prevItems, id]);
  };

  const handleRequest = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, requested: !item.requested };
        setIsDataUpdated(true);
        return updatedItem;
      }
      return item;
    });

    setUpdatedItems((prevItems) => [...prevItems, id]);
    setData(updatedData);
  };

  const handleNeededToggle = (id) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            needed: item.needed === "Urgent" ? "Soon" : "Urgent",
          };
          setIsDataUpdated(true);
          return updatedItem;
        }
        return item;
      });

      setUpdatedItems((prevItems) => [...prevItems, id]);
      return updatedData;
    });
  };

  const handleQuantityEdit = (id, newQuantity) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          setIsDataUpdated(true);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    setUpdatedItems((prevItems) => [...prevItems, id]);
  };

  const requestOrders = () => {
    if (updatedItems.length === 0) return;

    const updatedData = data.filter((item) => updatedItems.includes(item.id));
    console.log(updatedData);

    console.log(data);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDataUpdated(false);
      setUpdatedItems([]);
    }, 2000);
  };

  return (
    <section className="bg-foreground w-full h-full p-4 rounded rounded-tl-none">
      <Table
        data={data}
        role={"admin"}
        handleApprove={handleApprove}
        handleRequest={handleRequest}
        handleNeededToggle={handleNeededToggle}
        handleEdit={handleEdit}
        handleQuantityEdit={handleQuantityEdit}
      />
      <Button
        disabled={!isDataUpdated}
        onClick={requestOrders}
        icon={MdOutlinePlaylistAdd}
        loading={isLoading}
      >
        Request Order
      </Button>
    </section>
  );
};
