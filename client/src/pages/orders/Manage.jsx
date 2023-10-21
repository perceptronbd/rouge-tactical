import React, { useState } from "react";
import { Button, SearchInput, Text } from "../../components";
import { cw } from "../../utils";
import { historyData as initialData } from "../../mock/history";
import { MdDeleteOutline, MdOutlinePlaylistAdd } from "react-icons/md";

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

export const Table = ({ data, handleApprove }) => {
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
          <div className="max-h-[490px] 3xl:max-h-[830px] overflow-y-auto rounded-lg bg-accent-tertiary">
            <table className="w-full border-collapse">
              <thead className="text-xs text-white uppercase border-b-2 border-background bg-accent-tertiary sticky top-0">
                <tr>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
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
                    Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium text-center">
                    Substitute Vendor
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Needed
                  </th>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-center">
                    Approved
                  </th>
                  <th className="px-4 py-4 3xl:p-4 font-medium whitespace-nowrap text-left">
                    Delete
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
                ) : (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b-2 border-foreground bg-accent-tertiary-light hover:bg-accent-tertiary-hover transition-all ease-in-out duration-300`}
                    >
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 text-left">
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
                        {item.vendor}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.substituteVendor}
                      </td>
                      <td
                        className={cw("px-1 py-2 3xl:p-4 3xl:py-2 text-center")}
                      >
                        <span
                          className={cw(
                            "bg-white text-textColor px-2 text-sm font-semibold rounded-full",
                            {
                              "text-red-500": item.needed === "Soon",
                              "text-yellow-500": item.needed === "Urgent",
                            }
                          )}
                        >
                          {item.needed}
                        </span>
                      </td>

                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <Checkbox
                          id={item.id}
                          label={item.approved ? "Yes" : "No"}
                          checked={item.approved}
                          onClick={() => {
                            handleApprove(item.id);
                          }}
                          className={
                            "bg-foreground flex justify-center items-center rounded-md"
                          }
                        />
                      </td>
                      <td className="px-4 py-2 3xl:p-4 3xl:py-2 ">
                        <Button
                          icon={MdDeleteOutline}
                          className={"w-10 m-0"}
                          variant={"danger"}
                        />
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

export const Manage = () => {
  const [data, setData] = useState(() => {
    return initialData.map((item) => ({ ...item, approved: false }));
  });
  const [updatedItems, setUpdatedItems] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, approved: !item.approved } : item
    );

    setIsDataUpdated(true);
    setData(updatedData);
    setUpdatedItems((prevItems) => [...prevItems, id]);

    console.log(updatedData);
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
    <section className="bg-foreground w-full h-full p-4 rounded">
      <Table data={data} role={"admin"} handleApprove={handleApprove} />
      <Button
        disabled={!isDataUpdated}
        onClick={requestOrders}
        icon={MdOutlinePlaylistAdd}
        loading={isLoading}
      >
        Confirm
      </Button>
    </section>
  );
};
