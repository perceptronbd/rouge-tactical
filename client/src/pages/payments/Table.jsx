import React from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { Button, Text } from "../../components";
import { formatDate } from "../../utils";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#9F97F7",
  "#FFB44F",
];

export const Table = ({
  data,
  handleEdit,
  handleEditData,
  handleSubmit,
  disabled,
  handleDelete,
}) => {
  return (
    <>
      {data ? (
        <article className="rounded-lg">
          <div className="max-h-[230px] 3xl:max-h-[350px] overflow-y-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead className="text-textColor-light border-b-2 border-background bg-foreground sticky top-0">
                <tr>
                  <th className="px-1 py-4 3xl:p-4 font-normal whitespace-nowrap text-left">
                    Service
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-normal whitespace-nowrap text-center">
                    Account
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-normal whitespace-nowrap text-center">
                    Cost
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-normal whitespace-nowrap text-center">
                    Due
                  </th>
                  <th className="px-1 py-4 3xl:p-4 font-normal whitespace-nowrap text-right" />
                </tr>
              </thead>
              <tbody className="">
                {data.map((item, index) =>
                  item.isEditing ? (
                    <tr
                      key={index}
                      className={`border-b border-background hover:bg-background transition-all ease-in-out duration-300`}
                    >
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left flex gap-2 items-center">
                        <GoDotFill
                          style={{
                            color: COLORS[index % COLORS.length],
                          }}
                        />
                        <input
                          type="text"
                          className="border rounded-md p-1 w-28 text-left text-black"
                          value={item.service}
                          name="service"
                          onChange={(e) => handleEditData(item.id, e)}
                        />
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <input
                          type="text"
                          className="border rounded-md p-1 w-28 text-left text-black"
                          value={item.accountNumber}
                          name="accountNumber"
                          onChange={(e) => handleEditData(item.id, e)}
                        />
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <input
                          type="text"
                          className="border rounded-md p-1 w-10 text-left text-black"
                          value={item.cost}
                          name="cost"
                          onChange={(e) => handleEditData(item.id, e)}
                        />
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        <input
                          type="date"
                          className="border rounded-md p-1 w-28 text-left text-black"
                          value={item.dueDate}
                          name="dueDate"
                          onChange={(e) => handleEditData(item.id, e)}
                        />
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-right flex gap-2">
                        <Button
                          icon={BsFillCheckSquareFill}
                          onClick={() => handleSubmit(item.id)}
                          className="text-green-500 hover:text-green-300 w-10 bg-transparent m-0 "
                        />
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={index}
                      className={`border-b border-background hover:bg-background transition-all ease-in-out duration-300`}
                    >
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-left flex gap-2 items-center">
                        <GoDotFill
                          style={{
                            color: COLORS[index % COLORS.length],
                          }}
                        />{" "}
                        {item.service}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.accountNumber}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center">
                        {item.cost}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-center rt-sm:text-xs">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="px-1 py-2 3xl:p-4 3xl:py-2 text-right flex gap-2 rt-sm:w-8">
                        <Button
                          onClick={() => handleEdit(item.id)}
                          disabled={disabled}
                          icon={BiSolidMessageSquareEdit}
                          className="text-accent-primary hover:text-opacity-80 w-10 bg-transparent m-0 "
                        ></Button>
                        <Button
                          disabled={disabled}
                          icon={MdDelete}
                          className="text-red-500 hover:text-red-300 w-10 bg-transparent m-0"
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </article>
      ) : (
        <div className="flex w-full h-[230px] 3xl:h-[350px] justify-center items-center bg-foreground rounded-lg">
          <Text h1 className={"text-textColor-light"}>
            No Data to Show
          </Text>
        </div>
      )}
    </>
  );
};
