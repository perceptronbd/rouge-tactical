import React, { useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { historyData as initialData } from "../../mock/history";
import { Button, SearchInput, Text } from "../../components";
import { cw } from "../../utils";

const Checkbox = (props) => {
  const { id, label, className, onClick, checked } = props;

  return (
    <>
      <div className={cw("py-1", className)}>
        <input
          className="peer appearance-none h-4 w-4 border-2 border-red-500 rounded bg-transparent checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id={id}
          onClick={onClick}
          checked={checked}
        />
        {label && (
          <label
            className="inline-block peer-checked:text-green-500 text-red-500 font-semibold transition-all ease-in-out duration-300"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export const Table = ({
  data,
  role,
  handleApprove,
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
          <div className="flex justify-between mb-2">
            <div className="flex gap-4 h-10">
              <SearchInput value={searchQuery} onChange={handleSearch} />
            </div>
          </div>
          <div className="max-h-[510px] 3xl:max-h-[830px] overflow-y-auto rounded-lg bg-accent-tertiary">
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
                    Requests
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
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                        {item.date}
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
                              ? "text-yellow-500"
                              : "text-green-500"
                          )}
                          onClick={() => handleNeededToggle(item.id)}
                        >
                          {item.needed}
                        </div>
                      </td>

                      <td className="px-6 py-4 3xl:p-4 3xl:py-2 text-center">
                        <Checkbox
                          id={`request_${item.id}`}
                          label={item.requested ? "Yes" : "No"}
                          checked={item.requested}
                          onClick={() => handleRequest(item.id)}
                          className={
                            "flex justify-center items-center rounded-md bg-foreground m-0 p-1"
                          }
                        />
                      </td>
                      {role === "admin" && (
                        <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left">
                          <Checkbox
                            id={item.id}
                            label={item.approved ? "Yes" : "No"}
                            checked={item.approved}
                            onClick={() => handleApprove(item.id)}
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

export const Items = () => {
  const [data, setData] = useState(initialData);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [modifiedData, setModifiedData] = useState([]);

  const handleEdit = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleApprove = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, approved: !item.approved } : item
    );

    setData(updatedData);

    setModifiedData((prevModifiedData) => {
      const updatedItemIndex = prevModifiedData.findIndex(
        (item) => item.id === id
      );

      if (updatedItemIndex !== -1) {
        // If the item is already in modifiedData, replace it with the updated version
        const newModifiedData = [...prevModifiedData];
        newModifiedData[updatedItemIndex] = updatedData.find(
          (item) => item.id === id
        );
        return newModifiedData;
      }

      return [
        ...prevModifiedData,
        ...updatedData.filter((item) => item.id === id),
      ];
    });
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

    setData(updatedData);
    setModifiedData((prevModifiedData) => {
      const updatedItemIndex = prevModifiedData.findIndex(
        (item) => item.id === id
      );
      if (updatedItemIndex !== -1) {
        // If the item is already in modifiedData, replace it with the updated version
        const newModifiedData = [...prevModifiedData];
        newModifiedData[updatedItemIndex] = updatedData.find(
          (item) => item.id === id
        );
        return newModifiedData;
      }
      return [
        ...prevModifiedData,
        ...updatedData.filter((item) => item.id === id),
      ];
    });
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
      setModifiedData([
        ...modifiedData,
        ...updatedData.filter((item) => item.id === id),
      ]);
      return updatedData;
    });
  };

  const handleQuantityEdit = (id, newQuantity) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    setModifiedData((prevModifiedData) => {
      const updatedItemIndex = prevModifiedData.findIndex(
        (item) => item.id === id
      );

      if (updatedItemIndex !== -1) {
        // If the item is already in modifiedData, replace it with the updated version
        const newModifiedData = [...prevModifiedData];
        newModifiedData[updatedItemIndex] = {
          ...prevModifiedData[updatedItemIndex],
          quantity: newQuantity,
        };
        return newModifiedData;
      }
      return [...prevModifiedData, { id, quantity: newQuantity }];
    });
  };

  const requestOrders = () => {
    if (modifiedData.length === 0) {
      // If no data is modified, do not make the API call
      setIsDataUpdated(false);
      return;
    }

    console.log(modifiedData);

    // Make the API call with the modifiedData
    // ...
    // After the API call is successful, you can reset modifiedData if needed
    setIsDataUpdated(false);
    setModifiedData([]);
  };

  return (
    <section className="bg-foreground w-full h-full p-4 rounded rounded-tl-none">
      <Table
        data={data}
        role={"employee"}
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
      >
        Request Order
      </Button>
    </section>
  );
};
